import {
  TAngle
} from '../../types';

import angleFromSegmentToSegment from './angle-from-segment-to-segment';

/**
 * 角弧度 [0, 2π)
 */
export default function angleRadians(angle: TAngle): number {
  return angleFromSegmentToSegment([angle[1], angle[0]], [angle[1], angle[2]]);
}