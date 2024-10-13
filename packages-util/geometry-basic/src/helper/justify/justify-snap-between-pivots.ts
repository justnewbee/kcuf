import {
  TPoint
} from '../../types';

import justifySnapAroundPivotDetailed from './justify-snap-around-pivot-detailed';

export default function justifySnapBetweenPivots(point: TPoint, pivot1: TPoint, pivot2: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = justifySnapAroundPivotDetailed(point, pivot1, steps);
  const [pointP2, distance2] = justifySnapAroundPivotDetailed(point, pivot2, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}