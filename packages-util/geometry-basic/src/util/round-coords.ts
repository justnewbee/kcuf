import _round from 'lodash/round';

import {
  TPoint
} from '../types';

/**
 * 避免坐标的小数太多，默认保留 4 位小数
 */
export default function roundCoords(coords: TPoint, precision = 4): TPoint {
  return [_round(coords[0], precision), _round(coords[1], precision)];
}