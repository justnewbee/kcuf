import {
  TPoint,
  TSegment
} from '../types';

import pointDistanceToSegmentDetailed from './point-distance-to-segment-detailed';

export default function pointDistanceToSegment(point: TPoint, segment: TSegment): number {
  return pointDistanceToSegmentDetailed(point, segment)[0];
}
