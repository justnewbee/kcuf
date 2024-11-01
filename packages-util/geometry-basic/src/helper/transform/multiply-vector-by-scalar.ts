import {
  TVector
} from '../../types';

/**
 * 向量乘以标量
 */
export default function multiplyVectorByScalar(vector: TVector, scalar: number): TVector {
  return [
    vector[0] * scalar,
    vector[1] * scalar
  ];
}