import {
  TPoint,
  TSegment
} from '../types';

import segmentIsEqualSlope from './segment-is-equal-slope';
import pointIsInSegmentProjection from './point-is-in-segment-projection';

/**
 * 判断点是否在线段上，条件：
 *
 * 1. 点在线段投影内
 * 2. 点与线段两个端点连线的斜率相同
 */
export default function pointIsAlongSegment(p: TPoint, segment: TSegment): boolean {
  const [start, end] = segment;
  
  return pointIsInSegmentProjection(p, segment) && segmentIsEqualSlope([start, p], [p, end]);
}