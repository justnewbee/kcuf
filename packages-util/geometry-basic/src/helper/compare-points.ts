import {
  TPoint
} from '../types';

export default function comparePoints(p1: TPoint, p2: TPoint): number {
  return p1[0] === p2[0] ? p1[1] - p2[1] : p1[0] - p2[0];
}