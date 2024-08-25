import {
  TSegment
} from '../types';

import isPointEqual from './is-point-equal';

export default function isSegmentEqual(segment1: TSegment, segment2: TSegment): boolean {
  return (isPointEqual(segment1[0], segment2[0]) && isPointEqual(segment1[1], segment2[1])) || (isPointEqual(segment1[0], segment2[1]) && isPointEqual(segment1[1], segment2[0]));
}