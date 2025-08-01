import {
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';
import {
  isEqualSegments,
  isEqualLines
} from '../comparison';

import isPointInSegment from './is-point-in-segment';

/**
 * 检查两线段是否有重叠
 */
export default function isOverlappingSegments(segment1: TSegment, segment2: TSegment): boolean {
  if (isEqualSegments(segment1, segment2)) {
    return true;
  }
  
  const line1 = segmentLine(segment1);
  const line2 = segmentLine(segment2);
  
  if (!isEqualLines(line1, line2)) {
    return false;
  }
  
  const [p1, p2] = segment1;
  
  return isPointInSegment(p1, segment2) || isPointInSegment(p2, segment2);
}
