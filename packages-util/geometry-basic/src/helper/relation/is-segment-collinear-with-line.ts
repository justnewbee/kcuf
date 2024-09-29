import {
  TLine,
  TSegment
} from '../../types';
import {
  standardizeLine
} from '../../util';
import {
  segmentLine
} from '../base';
import {
  isEqualLines
} from '../comparison';

/**
 * 线段与直线是否共线
 */
export default function isSegmentCollinearWithLine(segment: TSegment, line: TLine): boolean {
  return isEqualLines(segmentLine(segment), standardizeLine(line));
}