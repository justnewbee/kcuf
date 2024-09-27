import {
  TPoint
} from '../types';

import pointSnapAroundPointBase from './point-snap-around-point-base';

export default function pointSnapAroundPoint(point: TPoint, center: TPoint, steps = 8): TPoint {
  return pointSnapAroundPointBase(point, center, steps)[0];
}