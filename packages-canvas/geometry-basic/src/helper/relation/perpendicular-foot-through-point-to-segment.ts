import {
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';

import perpendicularFootThroughPointToLine from './perpendicular-foot-through-point-to-line';

/**
 * 点 point 到线段 segment 的垂足（不一定在线段上）
 *
 *     ◉ p
 *     |
 *     |
 *     |⏋↙ ?
 * ◉---⦿----------◉ segment
 */
export default function perpendicularFootThroughPointToSegment(point: TPoint, segment: TSegment): TPoint {
  return perpendicularFootThroughPointToLine(point, segmentLine(segment));
}
