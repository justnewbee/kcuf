import {
  TSegment
} from '../types';

import pointIsEqual from './point-is-equal';

export default function segmentIsEqual(segment1: TSegment, segment2: TSegment): boolean {
  return (pointIsEqual(segment1[0], segment2[0]) && pointIsEqual(segment1[1], segment2[1])) || (pointIsEqual(segment1[0], segment2[1]) && pointIsEqual(segment1[1], segment2[0]));
}