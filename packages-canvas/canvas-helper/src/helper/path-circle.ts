import {
  IPathOptions
} from '../types';
import {
  createPathFn
} from '../util';

function pathCircle(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  const {
    center,
    radius
  } = options;
  
  canvasContext.beginPath();
  canvasContext.arc(center[0], center[1], radius, 0, Math.PI * 2);
  canvasContext.closePath();
}

export default createPathFn(pathCircle);
