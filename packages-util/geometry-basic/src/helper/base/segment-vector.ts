import {
  TSegment,
  TVector
} from '../../types';

/**
 * 线段向量
 */
export default function segmentVector(segment: TSegment): TVector {
  const [p1, p2] = segment;
  
  return [p2[0] - p1[0], p2[1] - p1[1]];
}
