import {
  TPoint,
  TSegment,
  TLineNormalized
} from '../../types';
import {
  segmentLine
} from '../base';

import perpendicularLineThroughPointToLine from './perpendicular-line-through-point-to-line';

/**
 * 经过点 point 且垂直于线段 segment 的直线 line（直线与线段不一定相交）
 *
 *   line?
 *    |                              line?
 *    ◉ p 在线段外                     |
 *    |                               |
 *    |⏋                             |⏋
 * ---|---◉---------◉ segment      ◉--◉-----------◉ segment
 *    |                               | p 在线段上
 */
export default function perpendicularLineThroughPointToSegment(point: TPoint, segment: TSegment): TLineNormalized {
  return perpendicularLineThroughPointToLine(point, segmentLine(segment));
}
