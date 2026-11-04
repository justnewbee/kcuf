/**
 * Colors are normalized RGB values, each channel in the `0 - 1` range.
 */
export interface IFluidColor {
  r: number;
  g: number;
  b: number;
}

export interface IFluidConfig {
  /**
   * Resolution of the simulation grid (velocity, pressure, curl).
   */
  simulationResolution?: number;
  /**
   * Resolution of the dye texture that gets displayed.
   */
  dyeResolution?: number;
  /**
   * How fast the dye fades out.
   */
  densityDissipation?: number;
  /**
   * How fast the velocity field fades out.
   */
  velocityDissipation?: number;
  /**
   * Pressure decay applied on every iteration.
   */
  pressure?: number;
  /**
   * Number of pressure solve iterations.
   */
  pressureIterations?: number;
  /**
   * Strength of the vorticity confinement.
   */
  curl?: number;
  /**
   * Radius of a splat, as a percentage of the canvas size.
   */
  splatRadius?: number;
  /**
   * Velocity multiplier applied to the pointer movements.
   */
  splatForce?: number;
  /**
   * Whether the display shader adds a fake 3D shading to the dye.
   */
  enableShading?: boolean;
  /**
   * How fast the pointer color cycles.
   */
  colorUpdateSpeed?: number;
}

export type TFluidParsedConfig = Required<IFluidConfig>;

export interface IFluidPointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: IFluidColor;
}

export interface ITextureFormat {
  internalFormat: number;
  format: number;
}

export interface ITextureExtensions {
  formatRgba: ITextureFormat;
  formatRg: ITextureFormat;
  formatR: ITextureFormat;
  halfFloatTexType: number;
  supportLinearFiltering: boolean;
}

export interface IFramebuffer {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  /**
   * Binds the texture to the given texture unit and returns that unit.
   */
  attach(id: number): number;
}

export interface IDoubleFramebuffer {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: IFramebuffer;
  write: IFramebuffer;
  swap(): void;
}

export type TUniforms = Record<string, WebGLUniformLocation | null>;

export interface ICanvasContextOptions {
  alpha: boolean;
  depth: boolean;
  stencil: boolean;
  antialias: boolean;
  preserveDrawingBuffer: boolean;
}
