import {
  TSegment
} from '../../types';
import {
  segmentVector,
  segmentLength
} from '../base';

/**
 * 计算有向线段（可能不相交）之间的夹角，范围 `[0, 2π)`
 *
 * 0 +━━━━━━━━━━━━━━━━━━━━> x
 *   ┃   ◉━━━━━━━◉ segment1 (from)
 *   ┃    ╲ ↙ +θ
 *   ┃     ╲
 *   ┃      ◉
 *   ┃     segment2 (to)
 */
export default function angleFromSegmentToSegment(segment1: TSegment, segment2: TSegment): number {
  const vector1 = segmentVector(segment1);
  const vector2 = segmentVector(segment2);
  const vectorDotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1]; // 点积和模
  const cosTheta = vectorDotProduct / (segmentLength(segment1) * segmentLength(segment2)); // 夹角的余弦值
  let radians = Math.acos(cosTheta); // 0-π
  
  if (vector1[0] * vector2[1] < vector1[1] * vector2[0]) {
    radians = 2 * Math.PI - radians;
  }
  
  return radians;
}