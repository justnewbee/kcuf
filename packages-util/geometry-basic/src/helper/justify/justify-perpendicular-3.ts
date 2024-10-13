import {
  IJustifyPerpendicularResult,
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';
import {
  intersectionLineWithLine,
  perpendicularLineThroughPointToSegment
} from '../relation';

import checkThresholdRadius from './_check-threshold-radius';
import checkThresholdAngle from './_check-threshold-angle';

/**
 * 正交纠正 #3：在 1 的基础上，沿与某临点连线移动，与另一临边正交
 *
 * 对 p 沿 sibling-p 移动，得到 p'，使 p'-segment.0 与 segment 垂直
 *
 *        ▲→ ━━━━━▲ segment 待正交
 *      ╱ ┃θ╲⏌
 *     ╱  ┃  ╲
 *    ╱   ┃    ╲
 *   ◉━━━━⦿━━━━◉━━━━━━━━━━▲ 上下两条线不一定平行，这里只是画起来方便
 *   p→   p'   ←p         sibling
 */
export default function justifyPerpendicular3(point: TPoint, sibling: TPoint, segment: TSegment, thresholdRadius: number, thresholdDegrees: number): IJustifyPerpendicularResult | null {
  const pointPrime = intersectionLineWithLine(segmentLine([sibling, point]), perpendicularLineThroughPointToSegment(segment[0], segment));
  
  if (!pointPrime) {
    return null;
  }

  const distance = checkThresholdRadius(thresholdRadius, point, pointPrime);
  
  if (distance < 0) {
    return null;
  }
  
  const theta = checkThresholdAngle(thresholdDegrees, [point, segment[0], pointPrime]);
  
  return theta >= 0 ? {
    point: pointPrime,
    theta,
    distance
  } : null;
}