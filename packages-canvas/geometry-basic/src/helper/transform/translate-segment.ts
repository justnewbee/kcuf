import {
  TSegment
} from '../../types';

import translatePoint from './translate-point';

export default function translateSegment(segment: TSegment, dxy: [number, number]): TSegment {
  return [translatePoint(segment[0], dxy), translatePoint(segment[1], dxy)];
}
