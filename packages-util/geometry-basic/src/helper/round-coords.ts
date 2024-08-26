import {
  round as _round
} from 'lodash-es';

import {
  TPoint
} from '../types';

/**
 * 减少误差，坐标尽量仅保留 1 位小数
 */
export default function roundCoords(coords: TPoint, precision = 1): TPoint {
  return [_round(coords[0], precision), _round(coords[1], precision)];
}