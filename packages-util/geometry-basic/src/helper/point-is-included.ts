import {
  TPoint
} from '../types';

import pointIsEqual from './point-is-equal';

export default function pointIsIncluded(point: TPoint, points: TPoint[]): boolean {
  return points.some(v => pointIsEqual(v, point));
}