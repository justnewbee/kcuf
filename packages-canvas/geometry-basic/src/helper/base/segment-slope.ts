import {
  TSegment
} from '../../types';

import segmentVector from './segment-vector';

/**
 * 获取线段的斜率（前提：不能是垂直线段）
 */
export default function segmentSlope(segment: TSegment): number {
  const [vx, vy] = segmentVector(segment);
  
  return vy / vx;
}
