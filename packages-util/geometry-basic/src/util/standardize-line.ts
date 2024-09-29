import {
  TLine,
  TLineStandard
} from '../types';

function division(dividend: number, divisor: number): number {
  return dividend === 0 ? 0 : dividend / divisor; // 判断 0 是为了不要出现 -0 影响单测
}

export default function standardizeLine(line: TLine): TLineStandard {
  const [A, B, C] = line;
  
  return B === 0 ? [1, 0, division(C, A)] : [division(A, -B), -1, division(C, -B)];
}