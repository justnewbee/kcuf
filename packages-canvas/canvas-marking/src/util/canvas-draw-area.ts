import {
  Path
} from '@kcuf/geometry-basic';

import {
  IDrawAreaOptions
} from '../types';

import canvasPathThroughPoints from './canvas-path-through-points';

export default function canvasDrawArea(canvasContext: CanvasRenderingContext2D, path: Path, options: IDrawAreaOptions): void {
  if (path.length < 3) {
    return;
  }
  
  canvasContext.save();
  canvasContext.fillStyle = options.color;
  
  canvasPathThroughPoints(canvasContext, path, true);
  
  canvasContext.fill();
  canvasContext.restore();
}
