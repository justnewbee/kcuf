import {
  TPoint
} from '../types';

import getSnappingPointBase from './get-snapping-point-base';

export default function getSnappingPointBetween(fixedPoint1: TPoint, fixedPoint2: TPoint, point: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = getSnappingPointBase(fixedPoint1, point, steps);
  const [pointP2, distance2] = getSnappingPointBase(fixedPoint2, point, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}