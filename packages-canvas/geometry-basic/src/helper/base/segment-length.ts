import {
  TSegment
} from '../../types';
import {
  getVectorMagnitude
} from '../../util';

import segmentVector from './segment-vector';

/**
 * 线段长度
 */
export default function segmentLength(segment: TSegment): number {
  return getVectorMagnitude(segmentVector(segment));
}
