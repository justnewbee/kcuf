import {
  TPoint
} from '../../types';
import {
  isNearlyEqual
} from '../../util';

export default function isEqualPoints(point1: TPoint, point2: TPoint): boolean {
  return isNearlyEqual(point1[0], point2[0]) && isNearlyEqual(point1[1], point2[1]);
}
