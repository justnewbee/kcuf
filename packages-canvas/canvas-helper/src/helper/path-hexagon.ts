import {
  TCoords
} from '../types';

import pathPolygon from './path-polygon';

/**
 * 六边形
 */
export default function pathHexagon(canvasContext: CanvasRenderingContext2D, center: TCoords, radius: number): void {
  pathPolygon(canvasContext, 6, center, radius, Math.PI / 6);
}