import {
  IJustifyPointPerpendicularThreshold,
  TPoint
} from '../../types';
import {
  fromRadiansToDegrees,
  parseJustifyPointPerpendicularThreshold
} from '../../util';
import {
  pointDistance
} from '../base';
import {
  angleThroughPoints
} from '../relation';
import {
  rotatePoint
} from '../transform';

/**
 * 对 p 绕 last 等轴旋转，得 p'，使 p'-last 所在直线与 last2ndd-last 线段垂直
 *
 * last2nd
 *   ◉━━━━━━━◉ last
 *        └ ╱θ┃θ╲
 *         ╱  ┃  ╲
 *      p ◉ ↘ ┃  ↙ ◉ p
 *            ⦿ p'
 */
export default function justifyPointPerpendicular1(point: TPoint, pointLast: TPoint, pointLast2nd: TPoint, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
  const {
    angle,
    distance
  } = parseJustifyPointPerpendicularThreshold(threshold);
  const bearingAngle = angleThroughPoints(pointLast2nd, pointLast, point);
  
  for (const v of [
    Math.PI / 2,
    3 * Math.PI / 2
  ]) {
    const deltaTheta = v - bearingAngle;
    const deltaThetaDegreesAbs = Math.abs(fromRadiansToDegrees(deltaTheta));
    
    if (deltaThetaDegreesAbs > 0 && deltaThetaDegreesAbs <= angle) {
      const pointPrime = rotatePoint(point, pointLast, deltaTheta);
      
      if (distance <= 0 || pointDistance(pointPrime, point) <= distance) {
        return pointPrime;
      }
    }
  }
  
  return null;
}