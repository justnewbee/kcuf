import {
  TSegment
} from '../types';
import {
  isNearlyEqual
} from '../util';

import segmentToLine from './segment-to-line';

/**
 * 线段斜率相等（平行或重叠）
 */
export default function segmentIsEqualSlope(segment1: TSegment, segment2: TSegment): boolean {
  const [A1, B1] = segmentToLine(segment1);
  const [A2, B2] = segmentToLine(segment2);
  
  return isNearlyEqual(A1, A2) && isNearlyEqual(B1, B2);
}