import {
  TSegment
} from '../types';

import segmentSlope from './segment-slope';

/**
 * 判断两根线段斜率相等（平行或重叠）
 */
export default function segmentIsEqualSlope(segment1: TSegment, segment2: TSegment): boolean {
  return Math.abs(segmentSlope(segment1) - segmentSlope(segment2)) < Number.EPSILON;
}