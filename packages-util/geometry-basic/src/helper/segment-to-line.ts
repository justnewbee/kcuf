import {
  TSegment,
  TLineStandard
} from '../types';

import lineStandardize from './line-standardize';

/**
 * 线段所在直线的方程系数，使方程 `A*x + B*y + C = 0` 成立
 *
 * 理论上 `x - y + 0 = 0` 与 `4x - 4y + 0 = 0` 等价，为了方便后续计算，我们统一 B 为 -1（方便直接转成 `y = x * 斜率 + 截距` 的情况）
 * 又考虑到 B 可能是 0，即 Y 轴或其平行线的情况，B 在我们这里只能为 0 或 -1，当 B 为 0 时，限定 A 为 1
 */
export default function segmentToLine(segment: TSegment): TLineStandard {
  const [[x1, y1], [x2, y2]] = segment;
  
  // 计算直线的常数项
  const A = y2 - y1;
  const B = x1 - x2;
  const C = x2 * y1 - x1 * y2;
  
  return lineStandardize([A, B, C]);
}