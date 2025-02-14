import _clamp from 'lodash/clamp';

import {
  IRgb
} from '../types';

interface IOptions {
  min?: number;
  max?: number;
}

export default function rgbShiftAlpha(rgb: IRgb, delta: number, options: IOptions = {}): IRgb {
  const {
    a = 100
  } = rgb;
  const {
    min = 0,
    max = 100
  } = options;
  
  return {
    ...rgb,
    a: _clamp(a + delta, min, max)
  };
}
