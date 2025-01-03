import {
  IPathOptions
} from '../types';

import pathPolygon from './path-polygon';

/**
 * 菱形
 */
export default function pathDiamond(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  pathPolygon(canvasContext, {
    ...options,
    vertices: 4
  });
}
