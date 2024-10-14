import {
  TPoint,
  TSegment,
  IJustifyPerpendicularResult
} from '../../types';
import {
  fromRadiansToDegrees
} from '../../util';
import {
  angleRadians
} from '../base';
import {
  rotatePoint
} from '../transform';

import checkThresholdRadius from './_check-threshold-radius';

/**
 * 正交纠正 #1：与临边垂直
 *
 * 给定线段 segment，对 p 绕 segment.0 等轴旋转，得 p'，使 p'-segment.0 与 segment 垂直，
 * 需判断旋转角度及位移是否在允许范围内
 *
 * ▲━━━━━━ ←▲ segment 待正交
 *         └┃θ╲
 *          ┃  ╲
 *          ┃  ↙ ◉ p
 *          ⦿ p'
 */
export default function justifyPerpendicular1(point: TPoint, segment: TSegment, thresholdRadius: number, thresholdDegrees: number): IJustifyPerpendicularResult | null {
  const bearingAngle = angleRadians([segment[1], segment[0], point]);
  
  for (const v of [
    Math.PI / 2,
    3 * Math.PI / 2
  ]) {
    const deltaTheta = v - bearingAngle;
    const deltaThetaDegreesAbs = Math.abs(fromRadiansToDegrees(deltaTheta));
    
    if (deltaThetaDegreesAbs > 0 && deltaThetaDegreesAbs <= thresholdDegrees) {
      const pointPrime = rotatePoint(point, segment[0], deltaTheta);
      const distance = checkThresholdRadius(thresholdRadius, point, pointPrime);
      
      if (distance >= 0) {
        return {
          point: pointPrime,
          distance,
          theta: deltaThetaDegreesAbs,
          angle: [pointPrime, segment[0], segment[1]]
        };
      }
    }
  }
  
  return null;
}