import {
  TLine,
  TLineNormalized
} from '../types';

/**
 * 标准化直线方程
 */
export default function normalizeLine(line: TLine): TLineNormalized {
  const [A, B, C] = line;
  
  return B === 0 ? [1, 0, C / A] : [A / -B, -1, C / -B];
}
