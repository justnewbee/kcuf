import {
  TPoint
} from '../types';

export default function pointIsEqual(p1: TPoint, p2: TPoint): boolean {
  return p1[0] === p2[0] && p1[1] === p2[1];
}
