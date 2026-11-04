import {
  IFluidConfig
} from './types';
import Fluid from './class/fluid';

/**
 * Creates a fluid simulation bound to the given canvas.
 */
export default function canvasFluid(canvas: HTMLCanvasElement, config?: IFluidConfig): Fluid {
  return new Fluid(canvas, config);
}

export type {
  IFluidConfig as FluidConfig
} from './types';
