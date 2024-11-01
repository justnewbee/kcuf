import {
  IParticlesConfig,
  IParsedConfigAnimateRadius
} from '../types';
import {
  DEFAULT_CONFIG_ANIMATE_RADIUS
} from '../const';

import parseConfigAnimateSpeedBase from './parse-config-animate-speed-base';

export default function parseConfigAnimateRadius(animateRadius: IParticlesConfig['animateRadius']): IParsedConfigAnimateRadius | null {
  return parseConfigAnimateSpeedBase(animateRadius, DEFAULT_CONFIG_ANIMATE_RADIUS);
}