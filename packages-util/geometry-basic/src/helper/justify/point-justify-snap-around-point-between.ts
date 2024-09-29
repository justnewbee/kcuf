import {
  TPoint
} from '../../types';

import pointJustifySnapAroundPointBase from './point-justify-snap-around-point-base';

export default function pointJustifySnapAroundPointBetween(point: TPoint, pivot1: TPoint, pivot2: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = pointJustifySnapAroundPointBase(point, pivot1, steps);
  const [pointP2, distance2] = pointJustifySnapAroundPointBase(point, pivot2, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}