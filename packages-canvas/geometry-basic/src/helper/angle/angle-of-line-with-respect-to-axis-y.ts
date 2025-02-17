import {
  TLine
} from '../../types';

/**
 * 直线相对于 X 轴的弧度值，范围 `[0, π)`
 *
 *      Y
 *  ╲   ┃
 *    ╲θ┃
 *   ━━━┃━━ X
 */
export default function angleOfLineWithRespectToAxisY(line: TLine): number {
  const [A, B] = line;
  
  if (A === 0) {
    return Math.PI / 2;
  }
  
  const theta = Math.atan(B / A); // (-Math.PI / 2, Math.PI / 2)
  
  return theta < 0 ? Math.PI + theta : theta;
}
