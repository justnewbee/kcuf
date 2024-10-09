import {
  IJustifyPointPerpendicularThreshold,
  TPoint
} from '../../types';
import {
  parseJustifyPointPerpendicularThreshold
} from '../../util';
import {
  perpendicularIntersectionThroughPointToSegment
} from '../relation';

import checkThresholdDistance from './_check-threshold-distance';
import checkThresholdAngle from './_check-threshold-angle';

/**
 * 对 p 沿 last-p 所在直线移动，得到 p'，使 1st-p' 垂直于 p-last 所在直线
 *
 *       ◉ 1st
 *     ╱θ┃θ╲
 *    ╱  ┃  ╲
 *   ╱   ┃⏋ ╲
 *  ◉━━━━⦿━━━◉━━━━━━━━◉
 *  p'→  p'   ←p      last
 */
export default function justifyPointPerpendicular2(point: TPoint, pointLast: TPoint, point1st: TPoint, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
  const {
    angle,
    distance
  } = parseJustifyPointPerpendicularThreshold(threshold);
  const pointPrime = perpendicularIntersectionThroughPointToSegment(point1st, [pointLast, point]);
  
  if (!checkThresholdDistance(distance, point, pointPrime)) {
    return null;
  }
  
  return checkThresholdAngle(angle, point, point1st, pointPrime) ? pointPrime : null;
}