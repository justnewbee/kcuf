import {
  TSegment,
  TVector
} from '../../types';

import vectorNormalize from './vector-normalize';
import segmentVector from './segment-vector';

/**
 * 点 p1 到 p2 的标准化单位向量
 */
export default function segmentVectorNormalized(segment: TSegment): TVector {
  return vectorNormalize(segmentVector(segment));
}