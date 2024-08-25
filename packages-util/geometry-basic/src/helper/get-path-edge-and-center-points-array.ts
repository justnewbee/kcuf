import {
  TPath,
  TPoint
} from '../types';

import getPathEdgeAndCenterPoints from './get-path-edge-and-center-points';

/**
 * getPathEdgeAndCenterPoints 的变体，返回固定顺序的数组
 */
export default function getPathEdgeAndCenterPointsArray(path: TPath): [TPoint, TPoint, TPoint, TPoint, TPoint] | null {
  const o = getPathEdgeAndCenterPoints(path);
  
  return o ? [o.t, o.r, o.b, o.l, o.c] : null;
}