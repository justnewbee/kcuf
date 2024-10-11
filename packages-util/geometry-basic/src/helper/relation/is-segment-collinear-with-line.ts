import {
  TLine,
  TSegment
} from '../../types';
import {
  segmentLine,
  lineNormalize
} from '../base';
import {
  isEqualLines
} from '../comparison';

/**
 * 线段与直线是否共线
 */
export default function isSegmentCollinearWithLine(segment: TSegment, line: TLine): boolean {
  return isEqualLines(segmentLine(segment), lineNormalize(line));
}