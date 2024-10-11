import {
  TVector
} from '../../types';

/**
 * 向量的模
 */
export default function vectorMagnitude(vector: TVector): number {
  return Math.hypot(...vector);
}