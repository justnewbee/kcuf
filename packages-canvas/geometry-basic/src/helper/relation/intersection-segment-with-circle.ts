import {
  TCircle,
  TPoint,
  TSegment
} from '../../types';
import {
  sortPointsBySegmentDirection
} from '../../util';
import {
  segmentLine
} from '../base';

import intersectionLineWithCircle from './intersection-line-with-circle';
import isPointInSegmentProjection from './is-point-in-segment-projection';

/**
 * 线段与圆相交点
 */
export default function intersectionSegmentWithCircle(segment: TSegment, circle: TCircle): TPoint[] {
  const points = intersectionLineWithCircle(segmentLine(segment), circle).filter(v => isPointInSegmentProjection(v, segment));
  
  return sortPointsBySegmentDirection(points, segment);
}
