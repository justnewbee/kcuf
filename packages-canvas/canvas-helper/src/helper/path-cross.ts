import {
  IPathOptions
} from '../types';
import {
  createPathFn
} from '../util';

/**
 * 画十字架
 */
function pathCross(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  const {
    center,
    radius
  } = options;
  
  canvasContext.beginPath();
  canvasContext.moveTo(center[0] - radius, center[1]);
  canvasContext.lineTo(center[0] + radius, center[1]);
  canvasContext.moveTo(center[0], center[1] - radius);
  canvasContext.lineTo(center[0], center[1] + radius);
}

export default createPathFn(pathCross);
