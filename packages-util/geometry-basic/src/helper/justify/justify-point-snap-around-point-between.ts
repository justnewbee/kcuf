import {
  TPoint
} from '../../types';

import justifyPointSnapAroundPointDetailed from './justify-point-snap-around-point-detailed';

export default function justifyPointSnapAroundPointBetween(point: TPoint, pivot1: TPoint, pivot2: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = justifyPointSnapAroundPointDetailed(point, pivot1, steps);
  const [pointP2, distance2] = justifyPointSnapAroundPointDetailed(point, pivot2, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}