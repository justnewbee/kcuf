import {
  TPoint
} from '../../types';

import justifySnapAroundPivotDetailed from './justify-snap-around-pivot-detailed';

export default function justifySnapAroundPivot(point: TPoint, pivot: TPoint, steps = 8): TPoint {
  return justifySnapAroundPivotDetailed(point, pivot, steps)[0];
}