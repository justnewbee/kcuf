import {
  TCoords
} from '../types';

import pathPolygon from './path-polygon';

export default function pathDiamond(canvasContext: CanvasRenderingContext2D, center: TCoords, radius: number): void {
  pathPolygon(canvasContext, 4, center, radius);
}