import {
  IPathOptions
} from '../types';

import pathPolygon from './path-polygon';

/**
 * 五边形
 */
export default function pathPentagon(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  pathPolygon(canvasContext, {
    ...options,
    vertices: 5
  });
}
