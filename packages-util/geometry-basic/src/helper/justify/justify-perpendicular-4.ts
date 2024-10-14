import {
  TPoint,
  TSegment,
  IJustifyPerpendicularResult
} from '../../types';
import {
  pointDistance
} from '../base';
import {
  isPointOnSegment
} from '../relation';

import justifyPerpendicular1 from './justify-perpendicular-1';
import justifyPerpendicular2 from './justify-perpendicular-2';

function getEndPoint(segment: TSegment, pointOnSetment: TPoint): TPoint {
  return pointDistance(segment[0], pointOnSetment) >= pointDistance(segment[1], pointOnSetment) ? segment[0] : segment[1];
}

/**
 * 当 point 或 pivot 其中之一在线段上时，微调 point 得 point'，使 point'-pivot 和 segment 垂直
 *
 * 场景 1：pivot 在线段上
 *
 *      pivot
 * ▲━━━━━◉━━━━━━━━▲ segment
 *       └┃θ╲
 *        ┃  ╲
 *        ┃  ↙ ◉ p
 *        ⦿ p'
 *
 * 场景 2：point 在线段上（需加判断 p' 是否在 segment 上）
 *
 *      p'  ←p
 * ▲━━━⦿━━━━◉━━━━━▲ segment
 *      ┃⏌  ╱
 *      ┃  ╱
 *      ┃θ╱
 *      ◉ pivot
 */
export default function justifyPerpendicular4(point: TPoint, pivot: TPoint, segment: TSegment, thresholdRadius: number, thresholdDegrees: number): IJustifyPerpendicularResult | null {
  const pointIsOnSegment = isPointOnSegment(point, segment);
  const pivotIsOnSegment = isPointOnSegment(pivot, segment);
  
  if (pointIsOnSegment === pivotIsOnSegment) { // 同时为 true 或 false，都不校正
    return null;
  }
  
  if (pivotIsOnSegment) {
    return justifyPerpendicular1(point, [pivot, getEndPoint(segment, pivot)], thresholdRadius, thresholdDegrees);
  }
  
  const possibleResult = justifyPerpendicular2(point, getEndPoint(segment, point), pivot, thresholdRadius, thresholdDegrees);
  
  return possibleResult && isPointOnSegment(possibleResult.point, segment) ? possibleResult : null;
}
