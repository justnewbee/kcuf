import {
  IJustifyPerpendicularResult,
  TPoint
} from '../../types';
import {
  perpendicularFootThroughPointToSegment
} from '../relation';

import checkThresholdRadius from './_check-threshold-radius';
import checkThresholdAngle from './_check-threshold-angle';

/**
 * 正交纠正 #2：在 1 的基础上，沿与某临点连线移动，与另一临点正交
 *
 * 对 p 沿 sibling1-p 所在直线移动，得到 p'，使 sibling2-p' 垂直于 p-sibling1 所在直线
 *
 *       ▲ sibling2
 *     ╱θ┃θ╲
 *    ╱  ┃  ╲
 *   ╱   ┃⏋ ╲
 *  ◉━━━━⦿━━━◉━━━━━━━━▲ 待正交
 *  p'→  p'   ←p      sibling1
 */
export default function justifyPerpendicular2(point: TPoint, sibling1: TPoint, sibling2: TPoint, thresholdRadius: number, thresholdDegrees: number): IJustifyPerpendicularResult | null {
  const pointPrime = perpendicularFootThroughPointToSegment(sibling2, [sibling1, point]);
  const distance = checkThresholdRadius(thresholdRadius, point, pointPrime);
  
  if (distance < 0) {
    return null;
  }
  
  const theta = checkThresholdAngle(thresholdDegrees, [point, sibling2, pointPrime]);
  
  return theta >= 0 ? {
    point: pointPrime,
    theta,
    distance
  } : null;
}