import {
  IParticlesConfig,
  IParsedConfigAnimateOpacity
} from '../types';
import {
  DEFAULT_CONFIG_ANIMATE_OPACITY
} from '../const';

import parseConfigAnimateSpeedBase from './parse-config-animate-speed-base';

export default function parseConfigAnimateOpacity(animateOpacity: IParticlesConfig['animateOpacity']): IParsedConfigAnimateOpacity | null {
  return parseConfigAnimateSpeedBase(animateOpacity, DEFAULT_CONFIG_ANIMATE_OPACITY);
}