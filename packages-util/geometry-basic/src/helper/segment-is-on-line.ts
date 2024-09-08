import {
  TLine,
  TSegment
} from '../types';

import segmentToLine from './segment-to-line';
import lineIsEqual from './line-is-equal';

export default function segmentIsOnLine(segment: TSegment, line: TLine): boolean {
  return lineIsEqual(segmentToLine(segment), line);
}