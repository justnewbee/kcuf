import {
  TVector
} from '../types';

/**
 * 向量的模
 */
export default function getVectorMagnitude(vector: TVector): number {
  return Math.hypot(...vector);
}
