import {
  TPoint,
  TSegment
} from '../types';

import pointToSegmentDistances from './point-to-segment-distances';

export default function pointToSegmentDistance(p: TPoint, segment: TSegment): number {
  return pointToSegmentDistances(p, segment)[0];
}
