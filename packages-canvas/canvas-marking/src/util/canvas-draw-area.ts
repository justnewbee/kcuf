import {
  Path
} from '@kcuf/geometry-basic';

import canvasPathThroughPoints from './canvas-path-through-points';

export default function canvasDrawArea(canvasContext: CanvasRenderingContext2D, path: Path, fillColor: string): void {
  if (path.length < 3) {
    return;
  }
  
  canvasContext.save();
  canvasContext.fillStyle = fillColor;
  
  canvasPathThroughPoints(canvasContext, path, true);
  
  canvasContext.fill();
  canvasContext.restore();
}