import {
  TSegment
} from '../types';

function isOverlap(n1: number, n2: number, n3: number, n4: number): boolean {
  return Math.max(n1, n2) >= Math.min(n3, n4) && Math.min(n1, n2) <= Math.max(n3, n4);
}

/**
 * 判断两根线段的投影重叠，可用于交叉、重叠检测预检
 */
export default function segmentProjectionOverlap(segment1: TSegment, segment2: TSegment): boolean {
  const [p1, p2] = segment1;
  const [p3, p4] = segment2;
  
  return isOverlap(p1[0], p2[0], p3[0], p4[0]) || isOverlap(p1[1], p2[1], p3[1], p4[1]);
}