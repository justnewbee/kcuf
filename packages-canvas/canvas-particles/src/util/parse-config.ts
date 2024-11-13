import {
  IParticlesConfig,
  IParticlesParsedConfig
} from '../types';
import {
  DEFAULT_COUNT
} from '../const';

import clamp from './clamp';
import parseConfigShape from './parse-config-shape';
import parseConfigImage from './parse-config-image';
import parseConfigRadius from './parse-config-radius';
import parseConfigOpacity from './parse-config-opacity';
import parseConfigLink from './parse-config-link';
import parseConfigAttract from './parse-config-attract';
import parseConfigAnimateMove from './parse-config-animate-move';
import parseConfigAnimateRadius from './parse-config-animate-radius';
import parseConfigAnimateOpacity from './parse-config-animate-opacity';
import parseConfigHoverLink from './parse-config-hover-link';
import parseConfigHoverRepulse from './parse-config-hover-repulse';
import parseConfigHoverBubble from './parse-config-hover-bubble';
import parseConfigClickRepulse from './parse-config-click-repulse';
import parseConfigClickBubble from './parse-config-click-bubble';

export default function parseConfig(props: IParticlesConfig): IParticlesParsedConfig {
  return {
    count: props.count || DEFAULT_COUNT,
    density: props.density ?? true,
    shape: parseConfigShape(props.shape),
    image: parseConfigImage(props.image),
    color: props.color,
    stroke: props.stroke,
    radius: parseConfigRadius(props.radius),
    opacity: parseConfigOpacity(props.opacity),
    link: parseConfigLink(props.link),
    attract: parseConfigAttract(props.attract),
    animateRadius: parseConfigAnimateRadius(props.animateRadius),
    animateOpacity: parseConfigAnimateOpacity(props.animateOpacity),
    animateMove: parseConfigAnimateMove(props.animateMove),
    hoverLink: parseConfigHoverLink(props.hoverLink),
    hoverRepulse: parseConfigHoverRepulse(props.hoverRepulse),
    hoverBubble: parseConfigHoverBubble(props.hoverBubble),
    clickGenerate: clamp(props.clickGenerate),
    clickRemove: clamp(props.clickRemove),
    clickRepulse: parseConfigClickRepulse(props.clickRepulse),
    clickBubble: parseConfigClickBubble(props.clickBubble)
  };
}
