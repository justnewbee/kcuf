import {
  TPoint
} from '../../types';

import justifyPointSnapAroundPointDetailed from './justify-point-snap-around-point-detailed';

export default function justifyPointSnapAroundPoint(point: TPoint, pivot: TPoint, steps = 8): TPoint {
  return justifyPointSnapAroundPointDetailed(point, pivot, steps)[0];
}