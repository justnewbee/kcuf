import {
  TVector
} from '../types';

/**
 * 向量点积
 */
export default function getVectorDotProduct(vector1: TVector, vector2: TVector): number {
  return vector1[0] * vector2[0] + vector1[1] * vector2[1];
}
