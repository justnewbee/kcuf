import {
  TSegment
} from '../types';

import getSegmentSlope from './get-segment-slope';

/**
 * 判断两根线段斜率相等
 */
export default function isSegmentSameSlope(segment1: TSegment, segment2: TSegment): boolean {
  return Math.abs(getSegmentSlope(segment1) - getSegmentSlope(segment2)) < Number.EPSILON;
}