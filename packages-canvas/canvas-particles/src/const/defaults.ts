import {
  TRange,
  IParsedConfigLink,
  IParsedConfigHoverBubble,
  IParsedConfigClickRepulse,
  IParsedConfigAnimateMove,
  IParsedConfigAnimateOpacity,
  IParsedConfigAnimateRadius,
  IParsedConfigClickBubble
} from '../types';

export const DEFAULT_COLOR = '#ccf';

export const DEFAULT_COUNT = 27;

export const DEFAULT_RADIUS_RANGE: TRange = [2, 6];

export const DEFAULT_OPACITY_RANGE: TRange = [20, 90];

export const DEFAULT_HOVER_REPULSE = 170;

export const DEFAULT_CONFIG_LINK: IParsedConfigLink = {
  distance: 157,
  width: 1,
  color: '#fff',
  opacity: 57
};

export const DEFAULT_CONFIG_HOVER_LINK: IParsedConfigLink = {
  distance: 200,
  width: 1,
  color: '#ff3',
  opacity: 37
};

export const DEFAULT_CONFIG_ANIMATE_RADIUS: IParsedConfigAnimateRadius = {
  speed: 4,
  speedSync: false
};

export const DEFAULT_CONFIG_ANIMATE_OPACITY: IParsedConfigAnimateOpacity = {
  speed: 20,
  speedSync: false
};

export const DEFAULT_CONFIG_ANIMATE_MOVE: IParsedConfigAnimateMove = {
  angle: 'random',
  speed: 80,
  speedSync: false,
  straight: false,
  bounce: false,
  bounceOnEdge: false
};

export const DEFAULT_CONFIG_HOVER_BUBBLE: IParsedConfigHoverBubble = {
  distance: 320,
  diffRadius: 4,
  diffOpacity: 40
};

export const DEFAULT_CONFIG_CLICK_REPULSE: IParsedConfigClickRepulse = {
  radius: 200,
  duration: 400
};

export const DEFAULT_CONFIG_CLICK_BUBBLE: IParsedConfigClickBubble = {
  distance: 320,
  diffRadius: 4,
  diffOpacity: 40,
  duration: 2000,
  speed: 100
};