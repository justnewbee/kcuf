import {
  TSegment,
  TVector
} from '../types';

/**
 * 点 p1 到 p2 的向量
 */
export default function segmentVector([p1, p2]: TSegment): TVector {
  return [p2[0] - p1[0], p2[1] - p1[1]];
}