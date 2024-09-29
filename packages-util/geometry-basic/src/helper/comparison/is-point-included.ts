import {
  TPoint
} from '../../types';

import isEqualPoints from './is-equal-points';

export default function isPointIncluded(point: TPoint, points: TPoint[]): boolean {
  return points.some(v => isEqualPoints(v, point));
}