import {
  IParticlesConfig,
  IParsedConfigHoverBubble
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_CONFIG_HOVER_BUBBLE
} from '../const';

export default function parseConfigHoverBubble(hoverBubble: IParticlesConfig['hoverBubble']): IParsedConfigHoverBubble | null {
  if (!hoverBubble) {
    return null;
  }
  
  const {
    distance: defaultDistance,
    diffRadius: defaultDiffRadius,
    diffOpacity: defaultDiffOpacity
  } = DEFAULT_CONFIG_HOVER_BUBBLE;
  let distance: number;
  let diffRadius: number;
  let diffOpacity: number;
  
  if (hoverBubble === true) {
    distance = defaultDistance;
    diffRadius = defaultDiffRadius;
    diffOpacity = defaultDiffOpacity;
  } else {
    distance = hoverBubble.distance ?? defaultDistance;
    diffRadius = hoverBubble.diffRadius ?? 0;
    diffOpacity = hoverBubble.diffOpacity ?? 0;
  }
  
  if (distance <= 0 || (!diffRadius && !diffOpacity)) {
    return null;
  }
  
  return {
    distance: distance * PIXEL_RATIO,
    diffRadius: diffRadius * PIXEL_RATIO,
    diffOpacity
  };
}
