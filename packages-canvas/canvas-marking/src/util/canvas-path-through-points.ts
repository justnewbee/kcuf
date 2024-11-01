import {
  Path
} from '@kcuf/geometry-basic';

export default function canvasPathThroughPoints(canvasContext: CanvasRenderingContext2D, path: Path, close?: boolean): void {
  canvasContext.beginPath();
  
  path.forEach((v, i) => {
    if (i === 0) {
      canvasContext.moveTo(v[0], v[1]);
    } else {
      canvasContext.lineTo(v[0], v[1]);
    }
  });
  
  if (close && path.length > 2) {
    canvasContext.closePath();
  }
}