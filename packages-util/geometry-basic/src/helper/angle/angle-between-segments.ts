import {
  TSegment
} from '../../types';

import angleOfSegmentWithRespectToSegment from './angle-of-segment-with-respect-to-segment';

/**
 * 获取两个线段的夹角，只取非钝角，范围 `[0, π/2]`
 *
 * - `orientationRegardless: true` 默认 →
 * - `orientationRegardless: false` 需显式传入 → `[0, π]`
 */
export default function angleBetweenSegments(segment1: TSegment, segment2: TSegment): number {
  const radians = angleOfSegmentWithRespectToSegment(segment1, segment2, true); // [0-π]
  
  return Math.min(radians, Math.PI - radians);
}