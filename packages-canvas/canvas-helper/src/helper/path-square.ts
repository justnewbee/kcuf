import {
  TCoords
} from '../types';

export default function pathSquare(canvasContext: CanvasRenderingContext2D, center: TCoords, radius: number): void {
  canvasContext.beginPath();
  canvasContext.rect(center[0] - radius, center[1] - radius, radius * 2, radius * 2);
  canvasContext.closePath();
}
