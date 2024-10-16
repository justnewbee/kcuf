import {
  TPoint
} from '../../types';

import isEqualPointsApproximately from './is-equal-points-approximately';

export default function isPointIncludedApproximately(point: TPoint, points: TPoint[]): boolean {
  return points.some(v => isEqualPointsApproximately(v, point));
}