import {
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';

import perpendicularIntersectionThroughPointToLine from './perpendicular-intersection-through-point-to-line';

/**
 * 点 point 到线段 segment 的垂足（不一定在线段上）
 *
 *     ◉ p
 *     ┃
 *     ┃
 *     ┃⏋↙ 垂足
 * ◉━━━⦿━━━━━━━━━━◉ segment
 */
export default function perpendicularIntersectionThroughPointToSegment(point: TPoint, segment: TSegment): TPoint {
  return perpendicularIntersectionThroughPointToLine(point, segmentLine(segment));
}