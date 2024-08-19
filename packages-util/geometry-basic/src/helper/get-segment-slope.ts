import {
  TSegment
} from '../types';

import getSegmentVector from './get-segment-vector';

/**
 * 获取线段的斜率（前提：不能是垂直线段）
 */
export default function getSegmentSlope(segment: TSegment): number {
  const [vx, vy] = getSegmentVector(segment);
  
  return vy / vx;
}