import {
  TPoint,
  TSegment
} from '../types';

import getSegmentEquationFactors from './get-segment-equation-factors';

/**
 * 获取点到线段的垂直距离（绝对值），以及在 x、y 方向的位移（相对值，有正负）
 */
export default function getPointDistancesToSegment(p: TPoint, segment: TSegment): [number, number, number] {
  const [A, B, C] = getSegmentEquationFactors(segment);
  const [x, y] = p;
  const AABB = A * A + B * B;
  const d = Math.abs(A * x + B * y + C) / Math.sqrt(AABB);
  const dx = A * (A * x + B * y + C) / AABB;
  const dy = B * (A * x + B * y + C) / AABB;
  
  return [d, dx, dy];
}