import {
  TSegment
} from '../types';

/**
 * 获取线段所在直线的方程系数，使方程 `A*x + B*y + C = 0` 成立
 */
export default function getSegmentEquationFactors(segment: TSegment): [number, number, number] {
  const [[x1, y1], [x2, y2]] = segment;
  
  // 计算直线的常数项
  const A = y2 - y1;
  const B = x1 - x2;
  const C = x2 * y1 - x1 * y2;
  
  return B > 0 ? [A, B, C] : [-A, -B, -C]; // 保证不论顺序，返回固定
}