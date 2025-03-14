import {
  TSegment,
  TVector
} from '../../types';
import {
  getVector
} from '../../util';

/**
 * 线段向量
 */
export default function segmentVector(segment: TSegment): TVector {
  return getVector(segment[0], segment[1]);
}
