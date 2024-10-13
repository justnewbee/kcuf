import {
  IJustifyPerpendicularResult,
  TPoint,
  TSegment
} from '../../types';
import {
  isPointOnSegment
} from '../relation';

import justifyPerpendicular1 from './justify-perpendicular-1';
import justifyPerpendicular2 from './justify-perpendicular-2';

/**
 * 当 point 或 pivot 其中之一在线段上时，微调 point 得 point'，使 point'-pivot 和 segment 垂直
 *
 * 场景 1：point 在线段上（需加判断 p' 是否在 segment 上）
 *
 *        p'  ←p
 * ▲━━━━━⦿━━━━◉━━━━━▲ segment
 *      └ ┃⏌  ╱
 *        ┃  ╱
 *        ┃θ╱
 *        ◉ pivot
 *
 * 场景 2：pivot 在线段上
 *
 *      pivot
 * ▲━━━━━◉━━━━━━━━▲ segment
 *       └┃θ╲
 *        ┃  ╲
 *        ┃  ↙ ◉ p
 *        ⦿ p'
 */
export default function justifyPerpendicular4(point: TPoint, pivot: TPoint, segment: TSegment, thresholdRadius: number, thresholdDegrees: number): IJustifyPerpendicularResult | null {
  const pointOnSegment = isPointOnSegment(point, segment);
  const pivotOnSegment = isPointOnSegment(pivot, segment);
  
  if (pointOnSegment === pivotOnSegment) { // 同时为 true 或 false，都不校正
    return null;
  }
  
  if (pivotOnSegment) {
    return justifyPerpendicular1(point, [pivot, segment[0]], thresholdRadius, thresholdDegrees);
  }
  
  const possibleResult = justifyPerpendicular2(point, segment[0], pivot, thresholdRadius, thresholdDegrees);
  
  return possibleResult && isPointOnSegment(possibleResult.point, segment) ? possibleResult : null;
}
