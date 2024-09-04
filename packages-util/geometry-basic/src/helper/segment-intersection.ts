import {
  TPoint,
  TSegment
} from '../types';

import segmentToLine from './segment-to-line';
import pointIsInSegmentProjection from './point-is-in-segment-projection';
import lineIntersection from './line-intersection';

/**
 * 线段相交点
 */
export default function segmentIntersection(segment1: TSegment, segment2: TSegment): TPoint | null {
  const intersectionPoint = lineIntersection(segmentToLine(segment1), segmentToLine(segment2)); // 这是直线相交点，并不表示线段相交
  
  if (!intersectionPoint) {
    return null;
  }
  
  // 线段相交需判断，需判断此相交点是否在两根线段的投影之内
  return pointIsInSegmentProjection(intersectionPoint, segment1) && pointIsInSegmentProjection(intersectionPoint, segment2) ? intersectionPoint : null;
}