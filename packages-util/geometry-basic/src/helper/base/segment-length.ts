import {
  TSegment
} from '../../types';

import pointDistance from './point-distance';

/**
 * 线段长度
 */
export default function segmentLength(segment: TSegment): number {
  return pointDistance(segment[0], segment[1]);
}
