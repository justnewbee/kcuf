import {
  TPoint,
  TSegment,
  TLineNormalized
} from '../../types';
import {
  segmentLine
} from '../base';

import parallelLineThroughPointToLine from './parallel-line-through-point-to-line';

export default function parallelLineThroughPointToSegment(point: TPoint, segment: TSegment): TLineNormalized {
  return parallelLineThroughPointToLine(point, segmentLine(segment));
}