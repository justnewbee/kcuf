import {
  TPoint
} from '../../types';

import justifyPointSnapAroundPointBase from './justify-point-snap-around-point-base';

export default function justifyPointSnapAroundPointBetween(point: TPoint, pivot1: TPoint, pivot2: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = justifyPointSnapAroundPointBase(point, pivot1, steps);
  const [pointP2, distance2] = justifyPointSnapAroundPointBase(point, pivot2, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}