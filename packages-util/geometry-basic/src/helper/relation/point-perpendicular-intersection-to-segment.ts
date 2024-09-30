import {
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';

import pointPerpendicularIntersectionToLine from './point-perpendicular-intersection-to-line';

/**
 * 点到线段的垂足
 */
export default function pointPerpendicularIntersectionToSegment(point: TPoint, segment: TSegment): TPoint {
  return pointPerpendicularIntersectionToLine(point, segmentLine(segment));
}