import {
  TPoint,
  TSegment,
  TLineNormalized
} from '../../types';
import {
  segmentLine
} from '../base';

import parallelLineThroughPointToLine from './parallel-line-through-point-to-line';

/**
 * 求经过点 point 且平行于线段 segment 的平行线 line
 *
 * ------▲------ line?
 * ◉---------◉ segment
 */
export default function parallelLineThroughPointToSegment(point: TPoint, segment: TSegment): TLineNormalized {
  return parallelLineThroughPointToLine(point, segmentLine(segment));
}
