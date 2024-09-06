import {
  clamp as _clamp
} from 'lodash-es';

import {
  TSegment
} from '../types';
import {
  isNearlyEqual
} from '../util';

import segmentVector from './segment-vector';
import segmentLength from './segment-length';

/**
 * 获取两个线段的夹角，返回弧度，返回值范围：
 *
 * - `orientationRegardless: true` 默认 → `[0, π/2]`
 * - `orientationRegardless: false` 需显式传入 → `[0, π]`
 */
export default function getAngleBetweenSegments(segment1: TSegment, segment2: TSegment, orientationRegardless = true): number {
  const vector1 = segmentVector(segment1);
  const vector2 = segmentVector(segment2);
  const vectorDotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1]; // 向量的点积
  const mag1 = segmentLength(segment1);
  const mag2 = segmentLength(segment2);
  const cosTheta = _clamp(vectorDotProduct / (mag1 * mag2), -1, 1);
  
  const radians = Math.acos(cosTheta); // 0-π
  
  if (orientationRegardless) { // 不论向量朝向，只返回锐角
    if (isNearlyEqual(radians, Math.PI)) {
      return 0;
    }
    
    return Math.min(radians, Math.PI - radians);
  }
  
  return radians;
}