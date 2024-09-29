import {
  TPoint
} from '../../types';

import pointJustifySnapAroundPointBase from './point-justify-snap-around-point-base';

export default function pointJustifySnapAroundPoint(point: TPoint, pivot: TPoint, steps = 8): TPoint {
  return pointJustifySnapAroundPointBase(point, pivot, steps)[0];
}