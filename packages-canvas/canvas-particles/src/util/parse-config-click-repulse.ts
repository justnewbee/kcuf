import {
  IParticlesConfig,
  IParsedConfigClickRepulse
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_CONFIG_CLICK_REPULSE
} from '../const';

export default function parseConfigClickRepulse(clickRepulse: IParticlesConfig['clickRepulse']): IParsedConfigClickRepulse | null {
  if (!clickRepulse) {
    return null;
  }
  
  const {
    radius: defaultRadius,
    duration: defaultDuration
  } = DEFAULT_CONFIG_CLICK_REPULSE;
  let radius: number;
  let duration: number;
  
  if (clickRepulse === true) {
    radius = defaultRadius;
    duration = defaultDuration;
  } else if (typeof clickRepulse === 'number') {
    radius = clickRepulse;
    duration = defaultDuration;
  } else {
    radius = clickRepulse.radius ?? defaultRadius;
    duration = clickRepulse.duration ?? defaultDuration;
  }
  
  if (radius <= 0) {
    return null;
  }
  
  return {
    radius: radius * PIXEL_RATIO,
    duration
  };
}
