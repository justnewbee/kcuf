import {
  IParticlesConfig,
  IParsedConfigClickBubble
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_CONFIG_CLICK_BUBBLE
} from '../const';

export default function parseConfigClickBubble(clickBubble: IParticlesConfig['clickBubble']): IParsedConfigClickBubble | undefined {
  if (!clickBubble) {
    return;
  }
  
  const {
    distance: defaultDistance,
    diffRadius: defaultDiffRadius,
    diffOpacity: defaultDiffOpacity,
    duration: defaultDuration,
    speed: defaultSpeed
  } = DEFAULT_CONFIG_CLICK_BUBBLE;
  let distance: number;
  let diffRadius: number;
  let diffOpacity: number;
  let duration: number;
  let speed: number;
  
  if (clickBubble === true) {
    distance = defaultDistance;
    diffRadius = defaultDiffRadius;
    diffOpacity = defaultDiffOpacity;
    duration = defaultDuration;
    speed = defaultSpeed;
  } else {
    distance = clickBubble.distance ?? defaultDistance;
    diffRadius = clickBubble.diffRadius ?? defaultDiffRadius;
    diffOpacity = clickBubble.diffOpacity ?? defaultDiffOpacity;
    duration = clickBubble.duration ?? defaultDuration;
    speed = clickBubble.speed ?? defaultSpeed;
  }
  
  if (distance <= 0) {
    return;
  }
  
  return {
    distance: distance * PIXEL_RATIO,
    diffRadius: diffRadius * PIXEL_RATIO,
    diffOpacity: diffOpacity,
    duration,
    speed
  };
}