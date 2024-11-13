import {
  TRange,
  IParticlesConfig
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_RADIUS_RANGE
} from '../const';

import makeSureMinMax from './make-sure-min-max';

export default function parseConfigRadius(radius: IParticlesConfig['radius']): TRange {
  if (!radius) {
    return [DEFAULT_RADIUS_RANGE[0] * PIXEL_RATIO, DEFAULT_RADIUS_RANGE[1] * PIXEL_RATIO];
  }
  
  if (typeof radius === 'number') {
    return [radius * PIXEL_RATIO, radius * PIXEL_RATIO];
  }
  
  return makeSureMinMax([radius[0] * PIXEL_RATIO, radius[1] * PIXEL_RATIO]);
}
