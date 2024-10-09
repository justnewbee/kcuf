import {
  IJustifyPointPerpendicularThreshold,
  TPoint
} from '../../types';
import {
  parseJustifyPointPerpendicularThreshold
} from '../../util';
import {
  segmentLine
} from '../base';
import {
  lineIntersection,
  perpendicularLineThroughPointToSegment
} from '../relation';

import checkThresholdDistance from './_check-threshold-distance';
import checkThresholdAngle from './_check-threshold-angle';

/**
 * 对 p 沿 last-p 移动，得到 p'，使 p'-1st 与 1st-2nd 垂直
 *
 *       1st          2nd
 *        ◉━━━━━━━━━━━◉
 *      ╱ ┃θ╲⏌
 *     ╱  ┃  ╲
 *    ╱   ┃    ╲
 *   ◉━━━━⦿━━━━◉━━━━━━━━━━◉ 上下两条线不一定平行，这里只是画起来方便
 *   p→   p'   ←p     last
 */
export default function justifyPointPerpendicular3(point: TPoint, pointLast: TPoint, point1st: TPoint, point2nd: TPoint, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
  const {
    angle,
    distance
  } = parseJustifyPointPerpendicularThreshold(threshold);
  
  const pointPrime = lineIntersection(segmentLine([pointLast, point]), perpendicularLineThroughPointToSegment(point1st, [point1st, point2nd]));
  
  if (!pointPrime || !checkThresholdDistance(distance, point, pointPrime)) {
    return null;
  }
  
  return checkThresholdAngle(angle, point, point1st, pointPrime) ? pointPrime : null;
}