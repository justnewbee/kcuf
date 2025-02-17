import _round from 'lodash/round';

import {
  TPoint
} from '../types';

/**
 * 保留 10 位小数
 */
export default function roundCoords(coords: TPoint, precision = 10): TPoint {
  return [_round(coords[0], precision), _round(coords[1], precision)];
}
