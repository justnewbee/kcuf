import {
  TPoint
} from '../../types';
import {
  pointDistance
} from '../base';

/**
 * 判断几乎相等，由于计算出的坐标都会有小数，需要这个
 */
export default function isEqualPointsApproximately(point1: TPoint, point2: TPoint): boolean {
  return pointDistance(point1, point2) <= 0.1;
}
