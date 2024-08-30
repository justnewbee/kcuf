import {
  TPoint
} from '../types';

import getSnappingPointBase from './get-snapping-point-base';

export default function getSnappingPoint(point: TPoint, fixedPoint: TPoint, steps = 8): TPoint {
  return getSnappingPointBase(point, fixedPoint, steps)[0];
}