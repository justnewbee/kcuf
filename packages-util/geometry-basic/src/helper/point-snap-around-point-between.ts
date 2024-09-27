import {
  TPoint
} from '../types';

import pointSnapAroundPointBase from './point-snap-around-point-base';

export default function pointSnapAroundPointBetween(point: TPoint, center1: TPoint, center2: TPoint, steps = 8): TPoint {
  const [pointP1, distance1] = pointSnapAroundPointBase(point, center1, steps);
  const [pointP2, distance2] = pointSnapAroundPointBase(point, center2, steps);
  
  return distance1 > distance2 ? pointP2 : pointP1;
}