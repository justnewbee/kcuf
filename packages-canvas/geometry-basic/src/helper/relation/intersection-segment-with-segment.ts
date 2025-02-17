import {
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';

import intersectionLineWithLine from './intersection-line-with-line';
import isPointInSegmentProjection from './is-point-in-segment-projection';

/**
 * 线段交点
 */
export default function intersectionSegmentWithSegment(segment1: TSegment, segment2: TSegment): TPoint | null {
  const p = intersectionLineWithLine(segmentLine(segment1), segmentLine(segment2)); // 这是直线相交点，并不表示线段相交
  
  if (!p) {
    return null;
  }
  
  // 线段相交需判断，需判断此相交点是否在两根线段的投影之内
  return isPointInSegmentProjection(p, segment1) && isPointInSegmentProjection(p, segment2) ? p : null;
}
