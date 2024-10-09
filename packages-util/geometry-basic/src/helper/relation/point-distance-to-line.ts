import {
  TLine,
  TPoint
} from '../../types';
import {
  pointDistance
} from '../base';

import perpendicularIntersectionThroughPointToLine from './perpendicular-intersection-through-point-to-line';

/**
 * 点到直线的距离
 */
export default function pointDistanceToLine(point: TPoint, line: TLine): number {
  return pointDistance(point, perpendicularIntersectionThroughPointToLine(point, line));
}
