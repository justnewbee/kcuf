import {
  TSegment
} from '../types';

import getSegmentVector from './get-segment-vector';
import isSegmentProjectionOverlap from './is-segment-projection-overlap';

/**
 * 检测两根线段是否交叉
 */
export default function isSegmentCrossing(segment1: TSegment, segment2: TSegment): boolean {
  if (!isSegmentProjectionOverlap(segment1, segment2)) { // 投影不重叠的不可能相交
    return false;
  }
  
  const [a, b] = segment1;
  const [c, d] = segment2;
  
  // 向量
  const vAb = getSegmentVector([a, b]);
  const vAc = getSegmentVector([a, c]);
  const vAd = getSegmentVector([a, d]);
  const vDc = getSegmentVector([d, c]);
  const vDa = getSegmentVector([d, a]);
  const vDb = getSegmentVector([d, b]);
  
  // 条件 1：向量叉乘，判断点 c、d 分别在线段 a-b 两侧
  const abac = vAb[0] * vAc[1] - vAb[1] * vAc[0];
  const abad = vAb[0] * vAd[1] - vAb[1] * vAd[0];
  // 条件 2：向量叉乘，判断点 a、b 分别在线段 c-d 两侧
  const dcda = vDc[0] * vDa[1] - vDc[1] * vDa[0];
  const dcdb = vDc[0] * vDb[1] - vDc[1] * vDb[0];
  
  // 同时满足条件 1+2 则线段交叉
  return abac * abad < 0 && dcda * dcdb < 0;
}