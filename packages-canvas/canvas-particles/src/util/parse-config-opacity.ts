import {
  TRange,
  IParticlesConfig
} from '../types';
import {
  DEFAULT_OPACITY_RANGE
} from '../const';

import makeSureMinMax from './make-sure-min-max';
import clampOpacity from './clamp-opacity';

export default function parseConfigOpacity(opacity: IParticlesConfig['opacity']): TRange {
  if (!opacity) {
    return DEFAULT_OPACITY_RANGE;
  }
  
  if (typeof opacity === 'number') {
    const opacityValue = clampOpacity(opacity);
    
    return [opacityValue, opacityValue];
  }
  
  return makeSureMinMax([clampOpacity(opacity[0]), clampOpacity(opacity[1])]);
}