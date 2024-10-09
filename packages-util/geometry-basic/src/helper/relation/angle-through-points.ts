import {
  TPoint
} from '../../types';

import angleFromSegmentToSegment from './angle-from-segment-to-segment';

/**
 * 角弧度 [0, 2π)
 */
export default function angleThroughPoints(pointStart: TPoint, pointMid: TPoint, pointEnd: TPoint): number {
  return angleFromSegmentToSegment([pointMid, pointStart], [pointMid, pointEnd]);
}