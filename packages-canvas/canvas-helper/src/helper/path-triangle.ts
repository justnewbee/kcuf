import {
  IPathOptions
} from '../types';

import pathPolygon from './path-polygon';

export default function pathTriangle(canvasContext: CanvasRenderingContext2D, options: IPathOptions): void {
  pathPolygon(canvasContext, {
    ...options,
    vertices: 3
  });
}
