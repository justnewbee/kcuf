import {
  TPoint,
  TLine,
  TLineStandard
} from '../../types';
import {
  standardizeLine
} from '../../util';

/**
 * 经过点且垂直于直线的直线 line'
 *
 * 直线 `Ax + By + C = 0` 的垂直线为 `A'x + B'y + C' = 0`，关系为 `(A', B')=(B, −A)`，即垂直线为 `Bx −Ay + C' = 0` → `C' = -Bx + Ay`
 *
 * 由于垂直线经过 `point`，将 `point` 代入即可（以上算法跟 C 值无关）
 *
 *  求 line'                        求 line'
 *     ┃                               ┃
 *     ◉ p                             ┃
 *     ┃                               ┃
 *     ┃⏋                             ┃⏋
 * ━━━━+━━━━━━━━━━━ line         ━━━━◉━━━━━━━━━━━ line
 *     ┃                               ┃ p
 */
export default function perpendicularLineThroughPointToLine(point: TPoint, line: TLine): TLineStandard {
  const [A, B] = line;
  const C = -B * point[0] + A * point[1];
  
  return standardizeLine([B, -A, C]);
}