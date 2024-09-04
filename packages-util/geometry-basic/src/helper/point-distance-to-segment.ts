import {
  TPoint,
  TSegment
} from '../types';

import pointDistanceToSegmentDetailed from './point-distance-to-segment-detailed';

export default function pointDistanceToSegment(p: TPoint, segment: TSegment): number {
  return pointDistanceToSegmentDetailed(p, segment)[0];
}
