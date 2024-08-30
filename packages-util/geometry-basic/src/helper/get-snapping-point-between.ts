import {
  TPoint
} from '../types';

import getSnappingPointBase from './get-snapping-point-base';

export default function getSnappingPointBetween(point: TPoint, fixedPoint1: TPoint, fixedPoint2: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = getSnappingPointBase(point, fixedPoint1, steps);
  const [pointP2, distance2] = getSnappingPointBase(point, fixedPoint2, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}