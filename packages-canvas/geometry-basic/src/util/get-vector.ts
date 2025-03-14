import {
  TPoint,
  TVector
} from '../types';

export default function getVector(p1: TPoint, p2: TPoint): TVector {
  return [p2[0] - p1[0], p2[1] - p1[1]];
}
