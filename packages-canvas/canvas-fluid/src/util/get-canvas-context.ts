import {
  ICanvasContextOptions
} from '../types';

export default function getCanvasContext(canvas: HTMLCanvasElement, contextId: string, attributes: ICanvasContextOptions): WebGL2RenderingContext | null {
  const getContext = canvas.getContext.bind(canvas) as (id: string, options?: ICanvasContextOptions) => unknown;
  
  return getContext(contextId, attributes) as WebGL2RenderingContext | null;
}
