import {
  TLine,
  TPoint
} from '../../types';
import {
  pointDistance
} from '../base';

import perpendicularFootThroughPointToLine from './perpendicular-foot-through-point-to-line';

/**
 * 点到直线的距离，并返回相对于垂足在 x、y 方向的相对位移（有正负）
 */
export default function pointDistanceToLineDetailed(point: TPoint, line: TLine): [number, number, number] {
  const p = perpendicularFootThroughPointToLine(point, line);
  
  return [
    pointDistance(point, p),
    point[0] - p[0],
    point[1] - p[1]
  ];
}
