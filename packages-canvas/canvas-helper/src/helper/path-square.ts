import {
  IPathOptions
} from '../types';
import {
  createPathFn
} from '../util';

function pathSquare(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  const {
    center,
    radius
  } = options;
  
  canvasContext.beginPath();
  canvasContext.rect(center[0] - radius, center[1] - radius, radius * 2, radius * 2);
  canvasContext.closePath();
}

export default createPathFn(pathSquare);
