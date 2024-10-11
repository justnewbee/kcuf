import {
  IJustifyPointPerpendicularDetailed,
  TPoint,
  TSegment
} from '../../types';
import {
  fromRadiansToDegrees
} from '../../util';
import {
  pointDistance
} from '../base';
import {
  angleRadians
} from '../relation';
import {
  rotatePoint
} from '../transform';

/**
 * 正交纠正 #1：与临边垂直
 *
 * 给定线段 segment，对 p 绕 segment[0] 等轴旋转，得 p'，使 p'-segment[0] 与 segment 垂直，
 * 需判断旋转角度及位移是否在允许范围内
 *
 * ▲━━━━━━ ←▲ segment
 *      └ ╱θ┃θ╲
 *       ╱  ┃  ╲
 *    p ◉ ↘ ┃  ↙ ◉ p
 *          ⦿ p'
 */
export default function justifyPointPerpendicular1(point: TPoint, segment: TSegment, thresholdRadius: number, thresholdDegrees: number): IJustifyPointPerpendicularDetailed | null {
  const bearingAngle = angleRadians([segment[1], segment[0], point]);
  
  for (const v of [
    Math.PI / 2,
    3 * Math.PI / 2
  ]) {
    const deltaTheta = v - bearingAngle;
    const deltaThetaDegreesAbs = Math.abs(fromRadiansToDegrees(deltaTheta));
    
    if (deltaThetaDegreesAbs > 0 && deltaThetaDegreesAbs <= thresholdDegrees) {
      const pointPrime = rotatePoint(point, segment[0], deltaTheta);
      const distance = pointDistance(pointPrime, point);
      
      if (thresholdRadius <= 0 || pointDistance(pointPrime, point) <= thresholdRadius) {
        return {
          point: pointPrime,
          theta: deltaThetaDegreesAbs,
          distance
        };
      }
    }
  }
  
  return null;
}