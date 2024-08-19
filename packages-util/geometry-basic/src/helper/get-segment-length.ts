import {
  TSegment
} from '../types';

import getSegmentVector from './get-segment-vector';

/**
 * 计算线段长度（两点间距）
 */
export default function getSegmentLength(segment: TSegment): number {
  const [vx, vy] = getSegmentVector(segment);
  
  return Math.hypot(vx, vy);
}
