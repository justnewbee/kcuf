import {
  TAngle,
  TSegment
} from '../../types';
import {
  getVectorDotProduct
} from '../../util';
import {
  segmentVector,
  segmentLength
} from '../base';

/**
 * 角弧度，默认范围 `[0, 2π)`，若传入 `undirected: true`，范围为 `[0, π]`
 *
 *      ◉ C
 *     /
 *    / θ?
 * B ◉----------◉ A
 */
export default function angleRadians(angle: TAngle, undirected?: boolean): number {
  const [a, b, c] = angle;
  const ba: TSegment = [b, a];
  const bc: TSegment = [b, c];
  const vectorBa = segmentVector(ba);
  const vectorBc = segmentVector(bc);
  const vectorDotProduct = getVectorDotProduct(vectorBa, vectorBc);
  const cosTheta = vectorDotProduct / (segmentLength(ba) * segmentLength(bc)); // 夹角的余弦值
  let radians = Math.acos(cosTheta); // [0, π]
  
  if (!undirected && vectorBa[0] * vectorBc[1] < vectorBa[1] * vectorBc[0]) {
    radians = 2 * Math.PI - radians; // [0, 2π)
  }
  
  return radians;
}
