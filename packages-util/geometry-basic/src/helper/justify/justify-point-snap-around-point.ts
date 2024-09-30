import {
  TPoint
} from '../../types';

import justifyPointSnapAroundPointBase from './justify-point-snap-around-point-base';

export default function justifyPointSnapAroundPoint(point: TPoint, pivot: TPoint, steps = 8): TPoint {
  return justifyPointSnapAroundPointBase(point, pivot, steps)[0];
}