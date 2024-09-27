import {
  TSegment
} from '../types';

import segmentVector from './segment-vector';
import segmentLength from './segment-length';

/**
 * 计算有向线段（可能不相交）之间的夹角，范围 `[0, 2π)`
 *
 * 0 +--------------> x
 *   |   ◉-------- segmentF(rom)
 *   |    \ ↙ +θ
 *   |     \
 *   |     segmentT(o)
 */
export default function angleFromSegmentToSegment(segmentF: TSegment, segmentT: TSegment): number {
  const vectorF = segmentVector(segmentF);
  const vectorT = segmentVector(segmentT);
  const vectorDotProduct = vectorF[0] * vectorT[0] + vectorF[1] * vectorT[1]; // 点积和模
  const cosTheta = vectorDotProduct / (segmentLength(segmentF) * segmentLength(segmentT)); // 夹角的余弦值
  let radians = Math.acos(cosTheta); // 0-π
  
  if (vectorF[0] * vectorT[1] < vectorF[1] * vectorT[0]) {
    radians = 2 * Math.PI - radians;
  }
  
  return radians;
}