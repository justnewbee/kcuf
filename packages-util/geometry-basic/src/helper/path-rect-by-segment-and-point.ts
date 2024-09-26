import _clamp from 'lodash/clamp';

import {
  TPoint,
  TSegment
} from '../types';
import {
  roundCoords
} from '../util';

import pointDistanceToSegmentDetailed from './point-distance-to-segment-detailed';

/**
 * 以给定线段为矩形的一条边，其平行边经过给定点，求矩形四个点坐标
 *
 * - 若点离线过近，返回 null
 * - 给定范围（左上顶点和右下顶点围成的正矩形）的情况下，需保证矩形不会超出
 */
export default function pathRectBySegmentAndPoint(segment: TSegment, point: TPoint, limit?: [TPoint, TPoint]): [TPoint, TPoint, TPoint, TPoint] | null {
  const [, dx0, dy0] = pointDistanceToSegmentDetailed(point, segment);
  
  if (Math.abs(dx0) < Number.EPSILON) { // dy0 认为也是 0
    return null;
  }
  
  const [p1, p2] = segment;
  let p3x = p2[0] + dx0;
  let p3y = p2[1] + dy0;
  let p4x = p1[0] + dx0;
  let p4y = p1[1] + dy0;
  
  if (!limit) {
    return [
      p1,
      p2,
      roundCoords([p3x, p3y]),
      roundCoords([p4x, p4y])
    ];
  }
  
  const xMin = Math.min(limit[0][0], limit[1][0]);
  const xMax = Math.max(limit[0][0], limit[1][0]);
  const yMin = Math.min(limit[0][1], limit[1][1]);
  const yMax = Math.max(limit[0][1], limit[1][1]);
  
  // 但 p3 p4 有可能超画布范围，先限定一下
  p3x = _clamp(p3x, xMin, xMax);
  p3y = _clamp(p3y, yMin, yMax);
  p4x = _clamp(p4x, xMin, xMax);
  p4y = _clamp(p4y, yMin, yMax);
  
  // 两个点在限定后，再计算与对应点的位移差，取绝对值小的那个
  let dx = Math.min(Math.abs(p3x - p2[0]), Math.abs(p4x - p1[0]));
  let dy = Math.min(Math.abs(p3y - p2[1]), Math.abs(p4y - p1[1]));
  
  // 需保证限定后的 dx dy 与之前值的比保持一致（否则变形），取绝对值小的那个
  const changeRatio = Math.min(Math.abs(dx / dx0), Math.abs(dy / dy0));
  
  dx = changeRatio * dx0;
  dy = changeRatio * dy0;
  
  return [
    p1,
    p2,
    roundCoords([p2[0] + dx, p2[1] + dy]),
    roundCoords([p1[0] + dx, p1[1] + dy])
  ];
}