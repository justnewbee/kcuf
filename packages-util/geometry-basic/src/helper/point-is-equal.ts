import {
  TPoint
} from '../types';
import {
  isNearlyEqual
} from '../util';

export default function pointIsEqual(p1: TPoint, p2: TPoint): boolean {
  return isNearlyEqual(p1[0], p2[0]) && isNearlyEqual(p1[1], p2[1]);
}
