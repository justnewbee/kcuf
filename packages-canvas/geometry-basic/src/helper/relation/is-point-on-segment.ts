import {
  TPoint,
  TSegment
} from '../../types';
import {
  isPointIncluded,
  isEqualSegmentsSlope
} from '../comparison';

import isPointInSegmentProjection from './is-point-in-segment-projection';

/**
 * 判断点是否在线段上（包括两个端点），条件：
 *
 * 1. 点在线段投影内
 * 2. 点与线段两个端点连线的斜率相同
 */
export default function isPointOnSegment(point: TPoint, segment: TSegment): boolean {
  if (isPointIncluded(point, segment)) {
    return true;
  }
  
  const [start, end] = segment;
  
  return isPointInSegmentProjection(point, segment) && isEqualSegmentsSlope([start, point], [point, end]);
}
