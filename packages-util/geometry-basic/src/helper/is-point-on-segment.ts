import {
  TPoint,
  TSegment
} from '../types';

import isSegmentSameSlope from './is-segment-same-slope';
import isPointInSegmentProjection from './is-point-in-segment-projection';

/**
 * 判断点是否在线段上，条件：
 * 
 * 1. 点在线段投影内
 * 2. 点与线段两个端点连线的斜率相同
 */
export default function isPointOnSegment(p: TPoint, segment: TSegment): boolean {
  const [start, end] = segment;
  
  return isPointInSegmentProjection(p, segment) && isSegmentSameSlope([start, p], [p, end]);
}
