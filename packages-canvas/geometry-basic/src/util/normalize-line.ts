import {
  TLine,
  TLineNormalized
} from '../types';

/**
 * 标准化直线方程
 */
export default function normalizeLine(line: TLine): TLineNormalized {
  const [A, B, C] = line;
  
  // 垂直线有误差，这里不能直接判断 B === 0
  return Math.abs(B) <= 2e-12 ? [1, 0, C / A] : [A / -B, -1, C / -B];
}
