import {
  TLine,
  TPoint
} from '../../types';
import {
  pointDistance
} from '../base';

import pointPerpendicularIntersectionToLine from './point-perpendicular-intersection-to-line';

/**
 * 点到直线的距离
 */
export default function pointDistanceToLine(point: TPoint, line: TLine): number {
  return pointDistance(point, pointPerpendicularIntersectionToLine(point, line));
}
