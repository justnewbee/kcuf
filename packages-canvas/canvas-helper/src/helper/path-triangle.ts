import {
  TCoords
} from '../types';

import pathPolygon from './path-polygon';

export default function pathTriangle(canvasContext: CanvasRenderingContext2D, center: TCoords, radius: number): void {
  pathPolygon(canvasContext, 3, center, radius);
}
