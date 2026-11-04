import {
  IFluidColor,
  IFluidConfig,
  IFluidPointer,
  TFluidParsedConfig,
  ITextureExtensions,
  IFramebuffer,
  IDoubleFramebuffer
} from '../types';
import {
  FLUID_CONFIG_DEFAULT,
  MAX_DELTA_TIME,
  CANVAS_STYLE,
  VERTEX_SHADER,
  COPY_SHADER,
  CLEAR_SHADER,
  DISPLAY_SHADER,
  SPLAT_SHADER,
  ADVECTION_SHADER,
  DIVERGENCE_SHADER,
  CURL_SHADER,
  VORTICITY_SHADER,
  PRESSURE_SHADER,
  GRADIENT_SUBTRACT_SHADER
} from '../const';
import {
  getWebglContext,
  compileShader,
  getResolution,
  scaleByPixelRatio,
  createFramebuffer,
  createDoubleFramebuffer,
  generateColor,
  createPointer
} from '../util';

import Program from './program';
import Material from './material';

/**
 * A fluid simulation driven by the mouse and touch movements of the page.
 * WebGL fluid simulation that runs on a `<canvas>` element.
 *
 * Extracted from the fluid effect used on https://indiegoodies.com (itself based on
 * PavelDoGreat's WebGL fluid simulation). The original component rendered a fixed
 * full screen canvas with `id="fluid"`; everything below is the framework agnostic
 * part — the React wrapper only needs to keep a canvas around and call `canvasFluid`.
 *
 * The pointer listeners are bound to `window`, so the canvas is expected to cover
 * the viewport (the effect follows the cursor anywhere on the page).
 */
export default class Fluid {
  private readonly config: TFluidParsedConfig;
  private readonly gl: WebGL2RenderingContext;
  private readonly ext: ITextureExtensions;
  private readonly pointers: IFluidPointer[];
  private readonly blit: (target: IFramebuffer | null, clear?: boolean) => void;
  private readonly copyProgram: Program;
  private readonly clearProgram: Program;
  private readonly splatProgram: Program;
  private readonly advectionProgram: Program;
  private readonly divergenceProgram: Program;
  private readonly curlProgram: Program;
  private readonly vorticityProgram: Program;
  private readonly pressureProgram: Program;
  private readonly gradientSubtractProgram: Program;
  private readonly displayMaterial: Material;
  
  private dye: IDoubleFramebuffer | null = null;
  private velocity: IDoubleFramebuffer | null = null;
  private divergence: IFramebuffer | null = null;
  private curlBuffer: IFramebuffer | null = null;
  private pressure: IDoubleFramebuffer | null = null;
  
  private lastUpdateTime = 0;
  private colorUpdateTimer = 0;
  private rafHandle = 0;
  private running = false;
  private destroyed = false;
  
  constructor(private readonly canvas: HTMLCanvasElement, config: IFluidConfig = {}) {
    canvas.style.cssText = CANVAS_STYLE;
    
    const context = getWebglContext(canvas);
    
    if (!context) {
      throw new Error('Unable to initialize WebGL.');
    }
    
    this.gl = context.gl;
    this.ext = context.ext;
    this.config = {
      ...FLUID_CONFIG_DEFAULT,
      ...config
    };
    this.pointers = [createPointer()];
    
    // Linear filtering on half float textures is what the advection shader relies
    // on. Without it the dye has to stay small enough for manual bilinear filtering
    // to still look smooth.
    if (!this.ext.supportLinearFiltering) {
      this.config.dyeResolution = 256;
      this.config.enableShading = false;
    }
    
    const gl = this.gl;
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    
    this.copyProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, COPY_SHADER));
    this.clearProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, CLEAR_SHADER));
    this.splatProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, SPLAT_SHADER));
    this.advectionProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, ADVECTION_SHADER, this.ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']));
    this.divergenceProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, DIVERGENCE_SHADER));
    this.curlProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, CURL_SHADER));
    this.vorticityProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, VORTICITY_SHADER));
    this.pressureProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, PRESSURE_SHADER));
    this.gradientSubtractProgram = new Program(gl, vertexShader, compileShader(gl, gl.FRAGMENT_SHADER, GRADIENT_SUBTRACT_SHADER));
    this.displayMaterial = new Material(gl, vertexShader, DISPLAY_SHADER);
    this.blit = this.createBlit();
    
    this.displayMaterial.setKeywords(this.config.enableShading ? ['SHADING'] : []);
    
    this.initFramebuffers();
    this.setupEvents();
  }
  
  /**
   * Starts the animation loop. It is started lazily on the first pointer
   * interaction so that an idle page does not burn frames.
   */
  start(): void {
    if (this.running || this.destroyed) {
      return;
    }
    
    this.running = true;
    this.lastUpdateTime = Date.now();
    this.rafHandle = window.requestAnimationFrame(this.update);
  }
  
  /**
   * Stops the animation loop and unbinds all the listeners.
   */
  destroy(): void {
    if (this.destroyed) {
      return;
    }
    
    this.destroyed = true;
    this.running = false;
    
    window.cancelAnimationFrame(this.rafHandle);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }
  
  private readonly update = (): void => {
    if (!this.running) {
      return;
    }
    
    const deltaTime = this.calcDeltaTime();
    
    if (this.resizeCanvas()) {
      this.initFramebuffers();
    }
    
    this.updateColors(deltaTime);
    this.applyInputs();
    this.step(deltaTime);
    this.render(null);
    
    this.rafHandle = window.requestAnimationFrame(this.update);
  };
  
  private calcDeltaTime(): number {
    const now = Date.now();
    const deltaTime = Math.min((now - this.lastUpdateTime) / 1000, MAX_DELTA_TIME);
    
    this.lastUpdateTime = now;
    
    return deltaTime;
  }
  
  private resizeCanvas(): boolean {
    const width = scaleByPixelRatio(this.canvas.clientWidth);
    const height = scaleByPixelRatio(this.canvas.clientHeight);
    
    if (this.canvas.width === width && this.canvas.height === height) {
      return false;
    }
    
    this.canvas.width = width;
    this.canvas.height = height;
    
    return true;
  }
  
  private updateColors(deltaTime: number): void {
    this.colorUpdateTimer += deltaTime * this.config.colorUpdateSpeed;
    
    if (this.colorUpdateTimer < 1) {
      return;
    }
    
    this.colorUpdateTimer %= 1;
    
    for (const pointer of this.pointers) {
      pointer.color = generateColor();
    }
  }
  
  private applyInputs(): void {
    for (const pointer of this.pointers) {
      if (!pointer.moved) {
        continue;
      }
      
      pointer.moved = false;
      
      this.splat(pointer.texcoordX, pointer.texcoordY, pointer.deltaX * this.config.splatForce, pointer.deltaY * this.config.splatForce, pointer.color);
    }
  }
  
  private step(deltaTime: number): void {
    const gl = this.gl;
    const {
      dye,
      velocity,
      pressure,
      divergence,
      curlBuffer
    } = this;
    
    if (!dye || !velocity || !pressure || !divergence || !curlBuffer) {
      return;
    }
    
    gl.disable(gl.BLEND);
    
    // Curl.
    this.curlProgram.bind();
    this.setUniform2f(this.curlProgram, 'texelSize', velocity.texelSizeX, velocity.texelSizeY);
    this.setUniform1i(this.curlProgram, 'uVelocity', velocity.read.attach(0));
    this.blit(curlBuffer);
    
    // Vorticity confinement.
    this.vorticityProgram.bind();
    this.setUniform2f(this.vorticityProgram, 'texelSize', velocity.texelSizeX, velocity.texelSizeY);
    this.setUniform1i(this.vorticityProgram, 'uVelocity', velocity.read.attach(0));
    this.setUniform1i(this.vorticityProgram, 'uCurl', curlBuffer.attach(1));
    this.setUniform1f(this.vorticityProgram, 'curl', this.config.curl);
    this.setUniform1f(this.vorticityProgram, 'dt', deltaTime);
    this.blit(velocity.write);
    velocity.swap();
    
    // Divergence.
    this.divergenceProgram.bind();
    this.setUniform2f(this.divergenceProgram, 'texelSize', velocity.texelSizeX, velocity.texelSizeY);
    this.setUniform1i(this.divergenceProgram, 'uVelocity', velocity.read.attach(0));
    this.blit(divergence);
    
    // Pressure decay.
    this.clearProgram.bind();
    this.setUniform1i(this.clearProgram, 'uTexture', pressure.read.attach(0));
    this.setUniform1f(this.clearProgram, 'value', this.config.pressure);
    this.blit(pressure.write);
    pressure.swap();
    
    // Jacobi pressure solve.
    this.pressureProgram.bind();
    this.setUniform2f(this.pressureProgram, 'texelSize', velocity.texelSizeX, velocity.texelSizeY);
    this.setUniform1i(this.pressureProgram, 'uDivergence', divergence.attach(0));
    
    for (let i = 0; i < this.config.pressureIterations; i++) {
      this.setUniform1i(this.pressureProgram, 'uPressure', pressure.read.attach(1));
      this.blit(pressure.write);
      pressure.swap();
    }
    
    // Subtract the pressure gradient.
    this.gradientSubtractProgram.bind();
    this.setUniform2f(this.gradientSubtractProgram, 'texelSize', velocity.texelSizeX, velocity.texelSizeY);
    this.setUniform1i(this.gradientSubtractProgram, 'uPressure', pressure.read.attach(0));
    this.setUniform1i(this.gradientSubtractProgram, 'uVelocity', velocity.read.attach(1));
    this.blit(velocity.write);
    velocity.swap();
    
    // Advect the velocity field by itself.
    this.advectionProgram.bind();
    this.setUniform2f(this.advectionProgram, 'texelSize', velocity.texelSizeX, velocity.texelSizeY);
    
    if (!this.ext.supportLinearFiltering) {
      this.setUniform2f(this.advectionProgram, 'dyeTexelSize', velocity.texelSizeX, velocity.texelSizeY);
    }
    
    this.setUniform1i(this.advectionProgram, 'uVelocity', velocity.read.attach(0));
    this.setUniform1i(this.advectionProgram, 'uSource', velocity.read.attach(0));
    this.setUniform1f(this.advectionProgram, 'dt', deltaTime);
    this.setUniform1f(this.advectionProgram, 'dissipation', this.config.velocityDissipation);
    this.blit(velocity.write);
    velocity.swap();
    
    // Advect the dye by the velocity field.
    if (!this.ext.supportLinearFiltering) {
      this.setUniform2f(this.advectionProgram, 'dyeTexelSize', dye.texelSizeX, dye.texelSizeY);
    }
    
    this.setUniform1i(this.advectionProgram, 'uVelocity', velocity.read.attach(0));
    this.setUniform1i(this.advectionProgram, 'uSource', dye.read.attach(1));
    this.setUniform1f(this.advectionProgram, 'dissipation', this.config.densityDissipation);
    this.blit(dye.write);
    dye.swap();
  }
  
  private render(target: IFramebuffer | null): void {
    const gl = this.gl;
    const dye = this.dye;
    
    if (!dye) {
      return;
    }
    
    const width = target ? target.width : gl.drawingBufferWidth;
    const height = target ? target.height : gl.drawingBufferHeight;
    
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    
    this.displayMaterial.bind();
    
    if (this.config.enableShading) {
      this.setUniform2f(this.displayMaterial, 'texelSize', 1 / width, 1 / height);
    }
    
    this.setUniform1i(this.displayMaterial, 'uTexture', dye.read.attach(0));
    this.blit(target);
  }
  
  private splat(x: number, y: number, deltaX: number, deltaY: number, color: IFluidColor): void {
    const dye = this.dye;
    const velocity = this.velocity;
    
    if (!dye || !velocity) {
      return;
    }
    
    this.splatProgram.bind();
    
    // Velocity.
    this.setUniform1i(this.splatProgram, 'uTarget', velocity.read.attach(0));
    this.setUniform1f(this.splatProgram, 'aspectRatio', this.canvas.width / this.canvas.height);
    this.setUniform2f(this.splatProgram, 'point', x, y);
    this.setUniform3f(this.splatProgram, 'color', deltaX, deltaY, 0);
    this.setUniform1f(this.splatProgram, 'radius', this.correctRadius(this.config.splatRadius / 100));
    this.blit(velocity.write);
    velocity.swap();
    
    // Dye.
    this.setUniform1i(this.splatProgram, 'uTarget', dye.read.attach(0));
    this.setUniform3f(this.splatProgram, 'color', color.r, color.g, color.b);
    this.blit(dye.write);
    dye.swap();
  }
  
  private correctRadius(radius: number): number {
    const aspectRatio = this.canvas.width / this.canvas.height;
    
    return aspectRatio > 1 ? radius * aspectRatio : radius;
  }
  
  private correctDeltaX(delta: number): number {
    const aspectRatio = this.canvas.width / this.canvas.height;
    
    return aspectRatio < 1 ? delta * aspectRatio : delta;
  }
  
  private correctDeltaY(delta: number): number {
    const aspectRatio = this.canvas.width / this.canvas.height;
    
    return aspectRatio > 1 ? delta / aspectRatio : delta;
  }
  
  private initFramebuffers(): void {
    const gl = this.gl;
    const simulation = getResolution(gl, this.config.simulationResolution);
    const dye = getResolution(gl, this.config.dyeResolution);
    const texType = this.ext.halfFloatTexType;
    const rgba = this.ext.formatRgba;
    const rg = this.ext.formatRg;
    const r = this.ext.formatR;
    const filtering = this.ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
    
    gl.disable(gl.BLEND);
    
    this.dye = this.resizeDoubleFramebuffer(this.dye, dye.width, dye.height, rgba.internalFormat, rgba.format, texType, filtering);
    this.velocity = this.resizeDoubleFramebuffer(this.velocity, simulation.width, simulation.height, rg.internalFormat, rg.format, texType, filtering);
    this.divergence = createFramebuffer(gl, simulation.width, simulation.height, r.internalFormat, r.format, texType, gl.NEAREST);
    this.curlBuffer = createFramebuffer(gl, simulation.width, simulation.height, r.internalFormat, r.format, texType, gl.NEAREST);
    this.pressure = createDoubleFramebuffer(gl, simulation.width, simulation.height, r.internalFormat, r.format, texType, gl.NEAREST);
  }
  
  private resizeFramebuffer(target: IFramebuffer, width: number, height: number, internalFormat: number, format: number, type: number, filtering: number): IFramebuffer {
    if (target.width === width && target.height === height) {
      return target;
    }
    
    const resized = createFramebuffer(this.gl, width, height, internalFormat, format, type, filtering);
    
    this.copyProgram.bind();
    this.setUniform1i(this.copyProgram, 'uTexture', target.attach(0));
    this.blit(resized);
    
    return resized;
  }
  
  private resizeDoubleFramebuffer(target: IDoubleFramebuffer | null, width: number, height: number, internalFormat: number, format: number, type: number, filtering: number): IDoubleFramebuffer {
    if (!target) {
      return createDoubleFramebuffer(this.gl, width, height, internalFormat, format, type, filtering);
    }
    
    if (target.width === width && target.height === height) {
      return target;
    }
    
    target.read = this.resizeFramebuffer(target.read, width, height, internalFormat, format, type, filtering);
    target.write = createFramebuffer(this.gl, width, height, internalFormat, format, type, filtering);
    target.width = width;
    target.height = height;
    target.texelSizeX = 1 / width;
    target.texelSizeY = 1 / height;
    
    return target;
  }
  
  private createBlit(): (target: IFramebuffer | null, clear?: boolean) => void {
    const gl = this.gl;
    const quad = gl.createBuffer();
    const indices = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    
    return (target: IFramebuffer | null, clear = false): void => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      
      if (clear) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  }
  
  private setupEvents(): void {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  }
  
  private readonly handleMouseDown = (event: MouseEvent): void => {
    this.start();
    
    const pointer = this.pointers[0];
    
    if (!pointer) {
      return;
    }
    
    this.setPointerDown(pointer, -1, event.clientX, event.clientY);
    
    // A click produces a burst that is brighter and faster than a regular move.
    const color = generateColor();
    
    color.r *= 10;
    color.g *= 10;
    color.b *= 10;
    
    this.splat(pointer.texcoordX, pointer.texcoordY, 10 * (Math.random() - 0.5), 30 * (Math.random() - 0.5), color);
  };
  
  private readonly handleMouseMove = (event: MouseEvent): void => {
    const pointer = this.pointers[0];
    
    if (!pointer) {
      return;
    }
    
    // The very first move only seeds the pointer, otherwise the jump from the
    // origin to the cursor would be rendered as one huge splat.
    if (!this.running) {
      this.placePointer(pointer, event.clientX, event.clientY);
      this.start();
      
      return;
    }
    
    this.movePointer(pointer, event.clientX, event.clientY, pointer.color);
  };
  
  private readonly handleTouchStart = (event: TouchEvent): void => {
    this.start();
    
    const pointer = this.pointers[0];
    
    if (!pointer) {
      return;
    }
    
    for (const touch of Array.from(event.targetTouches)) {
      this.setPointerDown(pointer, touch.identifier, touch.clientX, touch.clientY);
    }
  };
  
  private readonly handleTouchMove = (event: TouchEvent): void => {
    const pointer = this.pointers[0];
    
    if (!pointer) {
      return;
    }
    
    for (const touch of Array.from(event.targetTouches)) {
      this.movePointer(pointer, touch.clientX, touch.clientY, pointer.color);
    }
  };
  
  private readonly handleTouchEnd = (): void => {
    const pointer = this.pointers[0];
    
    if (!pointer) {
      return;
    }
    
    pointer.down = false;
  };
  
  private placePointer(pointer: IFluidPointer, clientX: number, clientY: number): void {
    pointer.texcoordX = scaleByPixelRatio(clientX) / this.canvas.width;
    pointer.texcoordY = 1 - scaleByPixelRatio(clientY) / this.canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.moved = false;
    pointer.color = generateColor();
  }
  
  private setPointerDown(pointer: IFluidPointer, id: number, clientX: number, clientY: number): void {
    pointer.id = id;
    pointer.down = true;
    
    this.placePointer(pointer, clientX, clientY);
  }
  
  private movePointer(pointer: IFluidPointer, clientX: number, clientY: number, color: IFluidColor): void {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = scaleByPixelRatio(clientX) / this.canvas.width;
    pointer.texcoordY = 1 - scaleByPixelRatio(clientY) / this.canvas.height;
    pointer.deltaX = this.correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = this.correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = pointer.deltaX !== 0 || pointer.deltaY !== 0;
    pointer.color = color;
  }
  
  private setUniform1i(source: Pick<Program, 'uniforms'>, name: string, value: number): void {
    const location = source.uniforms[name];
    
    if (location) {
      this.gl.uniform1i(location, value);
    }
  }
  
  private setUniform1f(source: Pick<Program, 'uniforms'>, name: string, value: number): void {
    const location = source.uniforms[name];
    
    if (location) {
      this.gl.uniform1f(location, value);
    }
  }
  
  private setUniform2f(source: Pick<Program, 'uniforms'>, name: string, x: number, y: number): void {
    const location = source.uniforms[name];
    
    if (location) {
      this.gl.uniform2f(location, x, y);
    }
  }
  
  private setUniform3f(source: Pick<Program, 'uniforms'>, name: string, x: number, y: number, z: number): void {
    const location = source.uniforms[name];
    
    if (location) {
      this.gl.uniform3f(location, x, y, z);
    }
  }
}
