import {
  TVector
} from '../../types';

import vectorMagnitude from './vector-magnitude';

/**
 * 点 p1 到 p2 的标准化单位向量
 */
export default function vectorNormalize(vector: TVector): TVector {
  const m = vectorMagnitude(vector);
  
  return [vector[0] / m, vector[1] / m];
}