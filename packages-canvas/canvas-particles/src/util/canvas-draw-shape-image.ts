import {
  pathSquare
} from '@kcuf/canvas-helper';

import {
  TCoords
} from '../types';

export default function canvasDrawShapeImage(canvasContext: CanvasRenderingContext2D, image: HTMLImageElement | null, center: TCoords, radius: number, aspectRatio: number): void {
  if (!image) { // fallback to square with red fill
    pathSquare(canvasContext, {
      center,
      radius
    });
    canvasContext.fillStyle = 'hsl(0 85% 57%)';
    canvasContext.fill();
  } else {
    canvasContext.drawImage(image, center[0] - radius, center[1] - radius, radius * 2, radius * 2 / aspectRatio);
  }
}
