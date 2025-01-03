import {
  IPathOptions
} from '../types';

import pathPolygon from './path-polygon';

/**
 * 六边形
 */
export default function pathHexagon(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  pathPolygon(canvasContext, {
    ...options,
    vertices: 6
  });
}
