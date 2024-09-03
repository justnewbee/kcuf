import {
  TSegment
} from '../types';

import segmentVector from './segment-vector';
import isSegmentProjectionOverlap from './is-segment-projection-overlap';

/**
 * 检测两根线段是否交叉
 */
export default function segmentIsCrossing(segment1: TSegment, segment2: TSegment): boolean {
  if (!isSegmentProjectionOverlap(segment1, segment2)) { // 投影不重叠的不可能相交
    return false;
  }
  
  const [a, b] = segment1;
  const [c, d] = segment2;
  
  // 向量
  const vAb = segmentVector([a, b]);
  const vAc = segmentVector([a, c]);
  const vAd = segmentVector([a, d]);
  const vDc = segmentVector([d, c]);
  const vDa = segmentVector([d, a]);
  const vDb = segmentVector([d, b]);
  
  // 条件 1：向量叉乘，判断点 c、d 分别在线段 a-b 两侧
  const abac = vAb[0] * vAc[1] - vAb[1] * vAc[0];
  const abad = vAb[0] * vAd[1] - vAb[1] * vAd[0];
  // 条件 2：向量叉乘，判断点 a、b 分别在线段 c-d 两侧
  const dcda = vDc[0] * vDa[1] - vDc[1] * vDa[0];
  const dcdb = vDc[0] * vDb[1] - vDc[1] * vDb[0];
  
  // 同时满足条件 1+2 则线段交叉
  return abac * abad < 0 && dcda * dcdb < 0;
}