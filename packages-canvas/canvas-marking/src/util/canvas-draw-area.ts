import {
  Path
} from '@kcuf/geometry-basic';

import canvasPathThroughPoints from './canvas-path-through-points';

interface IDrawAreaOptions {
  color: string;
}

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
