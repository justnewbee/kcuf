import {
  TPoint,
  TLine,
  TLineNormalized
} from '../../types';
import {
  normalizeLine
} from '../base';

/**
 * 求经过点 point 且平行于直线 line 的平行线 line'
 *
 * ━━━━━▲━━━━━ line'?
 * ━━━━━━━━━━━━━━━━ line
 */
export default function parallelLineThroughPointToLine(point: TPoint, line: TLine): TLineNormalized {
  const [A, B] = line;
  const cPrime = -A * point[0] - B * point[1]; // C' = -(Ax + By);
  
  return normalizeLine([A, B, cPrime]);
}