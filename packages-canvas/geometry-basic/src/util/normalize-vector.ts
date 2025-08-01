import {
  TVector
} from '../types';

import getVectorMagnitude from './get-vector-magnitude';

/**
 * 点 p1 到 p2 的标准化单位向量（如果是零向量，还是返回零向量）
 */
export default function normalizeVector(vector: TVector): TVector {
  const m = getVectorMagnitude(vector);
  
  return m === 0 ? [0, 0] : [vector[0] / m, vector[1] / m];
}
