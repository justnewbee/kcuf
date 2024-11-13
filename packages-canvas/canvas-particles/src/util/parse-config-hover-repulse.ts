import {
  IParticlesConfig
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_HOVER_REPULSE
} from '../const';

import clamp from './clamp';

export default function parseConfigHoverRepulse(hoverRepulse: IParticlesConfig['hoverRepulse']): number {
  if (!hoverRepulse) {
    return 0;
  }
  
  return clamp(hoverRepulse === true ? DEFAULT_HOVER_REPULSE : hoverRepulse) * PIXEL_RATIO;
}
