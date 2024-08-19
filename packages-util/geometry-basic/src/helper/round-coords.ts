import {
  round as _round
} from 'lodash-es';

import {
  TPoint
} from '../types';

export default function roundCoords(coords: TPoint, precision = 1): TPoint {
  return [_round(coords[0], precision), _round(coords[1], precision)];
}