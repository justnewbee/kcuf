import {
  TPoint,
  TSegment
} from '../types';

import segmentToLine from './segment-to-line';

/**
 * 获取点到线段的垂直距离（绝对值），即点到垂足的距离，并返回相对于垂足在 x、y 方向的相对位移（有正负）
 *
 * 垂足 x + dx = px
 * 垂足 y + dy = py
 */
export default function pointDistanceToSegmentDetailed(p: TPoint, segment: TSegment): [number, number, number] {
  const [A, B, C] = segmentToLine(segment);
  const [x, y] = p;
  const AABB = A * A + B * B;
  const d = Math.abs(A * x + B * y + C) / Math.sqrt(AABB);
  const dx = A * (A * x + B * y + C) / AABB;
  const dy = B * (A * x + B * y + C) / AABB;
  
  return [d, dx, dy];
}
