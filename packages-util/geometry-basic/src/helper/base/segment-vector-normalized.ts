import {
  TSegment,
  TVector
} from '../../types';

import normalizeVector from './normalize-vector';
import segmentVector from './segment-vector';

/**
 * 线段的标准化单位向量
 */
export default function segmentVectorNormalized(segment: TSegment): TVector {
  return normalizeVector(segmentVector(segment));
}
