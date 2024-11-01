import {
  TPoint,
  TSegment
} from '../../types';

import rotatePoint from './rotate-point';

export default function rotateSegment(segment: TSegment, pivot: TPoint, radians: number): TSegment {
  return [
    rotatePoint(segment[0], pivot, radians),
    rotatePoint(segment[1], pivot, radians)
  ];
}