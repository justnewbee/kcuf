import {
  EParticleShape
} from '../enum';
import {
  TCoords,
  IParticlesParsedConfig,
  IParticlesConfig,
  IParsedConfigLink,
  IParticlesClassType
} from '../types';
import {
  PIXEL_RATIO,
  DENSITY_AREA
} from '../const';
import {
  createColor,
  loadImage,
  parseConfig,
  calculateDistance,
  calculateImageAspectRatio,
  walkBetweenArray
} from '../util';

import Particle from './particle';

/**
 * All the particles
 */
export default class Particles implements IParticlesClassType {
  private readonly config: IParticlesParsedConfig;
  private readonly canvas: HTMLCanvasElement;
  private readonly canvasContext: CanvasRenderingContext2D;
  private canvasWidth = 400;
  private canvasHeight = 400;
  private image: HTMLImageElement | null = null;
  private imageAspectRatio = 1;
  private rafHandleDraw = 0;
  private particles: Particle[] = [];
  
  private coordsHover: TCoords | null = null;
  private coordsClick: TCoords | null = null;
  private timeClick = 0;
  
  constructor(canvas: HTMLCanvasElement, props: IParticlesConfig = {}) {
    this.config = parseConfig(props);
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    
    this.setupCanvas();
    this.setupEvents();
    this.start();
  }
  
  private draw = (): void => {
    this.updateAndDraw();
    
    if (this.animating) {
      this.rafHandleDraw = window.requestAnimationFrame(this.draw);
    }
  };
  
  private handleResize = (): void => {
    this.setupCanvas(); // will affect this.particlesCount value
    
    const missing = this.particlesCount - this.particles.length;
    
    if (missing >= 0) {
      this.createParticles(missing);
    } else {
      this.removeParticles(Math.abs(missing));
    }
    
    this.updateAndDrawOnce();
  };
  
  private handleMouseMove = (e: Event): void => {
    this.coordsHover = this.getMouseCoords(e as unknown as MouseEvent);
    
    this.updateAndDrawOnce();
  };
  
  private handleMouseLeave = (): void => {
    this.coordsHover = null;
    
    this.updateAndDrawOnce();
  };
  
  private handleMouseClick = (e: Event): void => {
    const {
      config
    } = this;
    
    this.timeClick = Date.now();
    this.coordsClick = this.getMouseCoords(e as MouseEvent);
    this.coordsHover = this.coordsClick; // 解决刷新后，鼠标不动但点击的场景
    
    if (config.clickRemove) {
      this.removeParticles(config.clickRemove);
    }
    
    if (config.clickGenerate) {
      this.createParticles(config.clickGenerate, this.coordsClick);
    }
    
    this.updateAndDrawOnce();
  };
  
  private get interactionTarget(): Window | HTMLCanvasElement {
    return this.config.eventOnWindow ? window : this.canvas;
  }
  
  private get particlesCount(): number {
    const {
      config
    } = this;
    
    if (!config.density) {
      return config.count;
    }
    
    return Math.ceil(this.canvasWidth * this.canvasHeight / (PIXEL_RATIO * PIXEL_RATIO * DENSITY_AREA) * config.count);
  }
  
  private get animating(): boolean {
    const {
      config: {
        animateRadius,
        animateOpacity,
        animateMove
      }
    } = this;
    
    return !!(animateRadius || animateOpacity || animateMove);
  }
  
  /**
   * Setup canvas size, will have a side effect that the canvas is cleared
   */
  private setupCanvas(): void {
    this.canvasWidth = this.canvas.offsetWidth * PIXEL_RATIO;
    this.canvasHeight = this.canvas.offsetHeight * PIXEL_RATIO;
    
    // Note that setting width and height will clear the canvas according to current spec
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }
  
  private setupEvents(): void {
    const {
      interactionTarget
    } = this;
    
    interactionTarget.addEventListener('mousemove', this.handleMouseMove);
    interactionTarget.addEventListener('mouseleave', this.handleMouseLeave);
    interactionTarget.addEventListener('click', this.handleMouseClick);
    
    window.addEventListener('resize', this.handleResize);
  }
  
  private async start(): Promise<void> {
    await this.prepare();
    this.createParticles(this.particlesCount);
    this.draw();
  }
  
  private async prepare(): Promise<void> {
    const {
      config
    } = this;
    
    if (!config.shape.includes(EParticleShape.IMAGE) || !config.image?.src) {
      return;
    }
    
    return loadImage(config.image.src).then(image => {
      this.image = image;
      this.imageAspectRatio = config.image?.aspectRatio ?? calculateImageAspectRatio(image);
    }).catch(err => {
      console.error(err.message); // eslint-disable-line no-console
    });
  }
  
  private createParticles(n: number, coords?: TCoords): void {
    const {
      config,
      canvasContext,
      canvasWidth,
      canvasHeight,
      image,
      imageAspectRatio
    } = this;
    
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle(canvasContext, config, {
        image,
        imageAspectRatio,
        canvasWidth,
        canvasHeight,
        coords
      }));
    }
  }
  
  private removeParticles(n: number): void {
    this.particles.splice(0, n);
  }
  
  private getMouseCoords(e: MouseEvent): TCoords {
    // TODO relative position
    const {
      interactionTarget
    } = this;
    let mouseX: number;
    let mouseY: number;
    
    if (interactionTarget === window) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    } else {
      mouseX = e.offsetX || e.clientX;
      mouseY = e.offsetY || e.clientY;
    }
    
    return [mouseX * PIXEL_RATIO, mouseY * PIXEL_RATIO];
  }
  
  private updateAndDrawOnce(): void {
    if (!this.animating) {
      this.updateAndDraw();
    }
  }
  
  private updateAndDraw(): void {
    this.updateBeforeDraw();
    this.drawEverything();
    this.updatePostDraw();
  }
  
  private updateBeforeDraw(): void {
    const {
      canvasWidth,
      canvasHeight,
      coordsHover,
      coordsClick,
      particles,
      timeClick
    } = this;
    const timeFromLastClick = Date.now() - timeClick;
    
    particles.forEach(p => {
      p.update({
        canvasWidth,
        canvasHeight,
        coordsHover,
        coordsClick,
        timeFromLastClick
      });
    });
  }
  
  private updatePostDraw(): void {
    walkBetweenArray(this.particles, (p1: Particle, p2: Particle) => {
      p1.attractAnother(p2);
      p1.bounceAnother(p2);
    });
  }
  
  private drawEverything(): void {
    const {
      config: {
        link,
        hoverLink
      },
      particles,
      coordsHover
    } = this;
    
    this.canvasClear();
    
    particles.forEach(p => {
      p.draw();
      
      if (hoverLink && coordsHover) {
        this.drawLink(p.coords, coordsHover, hoverLink);
      }
    });
    
    if (link) {
      walkBetweenArray(this.particles, (p1: Particle, p2: Particle) => {
        this.drawLink(p1.coords, p2.coords, link);
      });
    }
  }
  
  private drawLink([x1, y1]: TCoords, [x2, y2]: TCoords, link: IParsedConfigLink): void {
    const {
      canvasContext
    } = this;
    
    const distance = calculateDistance([x1, y1], [x2, y2]);
    const ratio = 1 - distance / link.distance;
    const opacity = link.opacity * ratio;
    
    if (opacity <= 0) {
      return;
    }
    
    canvasContext.strokeStyle = createColor(link.color).toColorString(opacity);
    canvasContext.lineWidth = link.width;
    // canvasContext.lineCap = 'round'; // performance issue
    
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
    canvasContext.closePath();
  }
  
  private canvasClear(): void {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  
  destroy(): void {
    window.cancelAnimationFrame(this.rafHandleDraw);
  }
  
  // exportImg(): void {
  //   window.open(this.canvas.toDataURL('image/png'), '_blank');
  // }
}