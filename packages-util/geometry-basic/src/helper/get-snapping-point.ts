import {
  TPoint
} from '../types';

import getSnappingPointBase from './get-snapping-point-base';

export default function getSnappingPoint(fixedPoint: TPoint, point: TPoint, steps = 8): TPoint {
  return getSnappingPointBase(fixedPoint, point, steps)[0];
}