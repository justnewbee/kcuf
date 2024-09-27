import {
  TPoint,
  TSegment
} from '../types';

import segmentIsEqualSlope from './segment-is-equal-slope';
import pointIsInSegmentProjection from './point-is-in-segment-projection';
import pointIsIncluded from './point-is-included';

/**
 * 判断点是否在线段上，条件：
 *
 * 1. 点在线段投影内
 * 2. 点与线段两个端点连线的斜率相同
 */
export default function pointIsAlongSegment(point: TPoint, segment: TSegment): boolean {
  if (pointIsIncluded(point, segment)) {
    return true;
  }
  
  const [start, end] = segment;
  
  return pointIsInSegmentProjection(point, segment) && segmentIsEqualSlope([start, point], [point, end]);
}
