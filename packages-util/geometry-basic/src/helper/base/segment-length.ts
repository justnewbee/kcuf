import {
  TSegment
} from '../../types';

import segmentVector from './segment-vector';
import vectorMagnitude from './vector-magnitude';

/**
 * 线段长度
 */
export default function segmentLength(segment: TSegment): number {
  return vectorMagnitude(segmentVector(segment));
}
