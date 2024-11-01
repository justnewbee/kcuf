import {
  TLine,
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';

import intersectionLineWithLine from './intersection-line-with-line';
import isPointInSegmentProjection from './is-point-in-segment-projection';

/**
 * 线段与直线相交点
 */
export default function intersectionSegmentWithLine(segment: TSegment, line: TLine): TPoint | null {
  const p = intersectionLineWithLine(segmentLine(segment), line);
  
  if (!p) {
    return null;
  }
  
  // 线段相交需判断，需判断此相交点是否在两根线段的投影之内
  return isPointInSegmentProjection(p, segment) ? p : null;
}
