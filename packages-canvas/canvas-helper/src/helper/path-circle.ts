import {
  TCoords
} from '../types';

export default function pathCircle(canvasContext: CanvasRenderingContext2D, center: TCoords, radius: number): void {
  canvasContext.beginPath();
  canvasContext.arc(center[0], center[1], radius, 0, Math.PI * 2);
  canvasContext.closePath();
}
