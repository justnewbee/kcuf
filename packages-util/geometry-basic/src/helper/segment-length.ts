import {
  TSegment
} from '../types';

import segmentVector from './segment-vector';

/**
 * 线段长度
 */
export default function segmentLength(segment: TSegment): number {
  const [vx, vy] = segmentVector(segment);
  
  return Math.hypot(vx, vy);
}
