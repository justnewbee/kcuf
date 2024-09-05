import {
  TLine,
  TPoint,
  TSegment
} from '../types';

import pointIsInSegmentProjection from './point-is-in-segment-projection';
import lineIntersection from './line-intersection';
import segmentToLine from './segment-to-line';

/**
 * 线段与直线相交点
 */
export default function segmentIntersectionWithLine(segment: TSegment, line: TLine): TPoint | null {
  const p = lineIntersection(segmentToLine(segment), line);
  
  if (!p) {
    return null;
  }
  
  // 线段相交需判断，需判断此相交点是否在两根线段的投影之内
  return pointIsInSegmentProjection(p, segment) ? p : null;
}