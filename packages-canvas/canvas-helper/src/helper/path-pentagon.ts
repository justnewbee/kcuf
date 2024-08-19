import {
  TCoords
} from '../types';

import pathPolygon from './path-polygon';

/**
 * 五边形
 */
export default function pathPentagon(canvasContext: CanvasRenderingContext2D, center: TCoords, radius: number): void {
  pathPolygon(canvasContext, 5, center, radius);
}