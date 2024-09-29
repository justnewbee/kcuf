import {
  TSegment
} from '../../types';

import segmentIntersection from './segment-intersection';

/**
 * 线段是否相交
 */
export default function isSegmentsIntersected(segment1: TSegment, segment2: TSegment): boolean {
  return !!segmentIntersection(segment1, segment2);
}