import {
  TSegment
} from '../../types';

import isEqualPoints from './is-equal-points';

/**
 * 线段相等
 */
export default function isEqualSegments(segment1: TSegment, segment2: TSegment): boolean {
  return (isEqualPoints(segment1[0], segment2[0]) && isEqualPoints(segment1[1], segment2[1])) || (isEqualPoints(segment1[0], segment2[1]) && isEqualPoints(segment1[1], segment2[0]));
}