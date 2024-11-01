import {
  TLine
} from '../../types';

/**
 * 直线相对于 X 轴的弧度值，范围 `[0, π)`
 *
 *      ╱
 *     ╱↖θ?
 *  ━━+━━━━━━━ X
 *   ╱
 */
export default function angleOfLineWithRespectToAxisX(line: TLine): number {
  const [A, B] = line;
  
  if (B === 0) {
    return Math.PI / 2;
  }
  
  // 斜率 m = -A/B，B≠0
  const theta = Math.atan(-A / B); // (-Math.PI / 2, Math.PI / 2)
  
  return theta < 0 ? Math.PI + theta : theta;
}