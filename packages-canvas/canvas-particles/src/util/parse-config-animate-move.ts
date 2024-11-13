import {
  IParticlesConfig,
  IParsedConfigAnimateMove
} from '../types';
import {
  PIXEL_RATIO,
  DEFAULT_CONFIG_ANIMATE_MOVE
} from '../const';

import parseConfigAnimateSpeedBase from './parse-config-animate-speed-base';

export default function parseConfigAnimateMove(animateMove: IParticlesConfig['animateMove'] = true): IParsedConfigAnimateMove | null {
  const speedBase = parseConfigAnimateSpeedBase(animateMove, DEFAULT_CONFIG_ANIMATE_MOVE);
  
  if (!speedBase) {
    return null;
  }
  
  const {
    speed,
    speedSync
  } = speedBase;
  
  const {
    angle: defaultAngle,
    straight: defaultStraight,
    bounce: defaultBounce,
    bounceOnEdge: defaultBounceOnEdge
  } = DEFAULT_CONFIG_ANIMATE_MOVE;
  let angle = defaultAngle;
  let straight = defaultStraight;
  let bounce = defaultBounce;
  let bounceOnEdge = defaultBounceOnEdge;
  
  if (animateMove && typeof animateMove === 'object') {
    angle = animateMove.angle ?? angle;
    straight = animateMove.straight ?? straight;
    bounce = animateMove.bounce ?? bounce;
    bounceOnEdge = animateMove.bounceOnEdge ?? bounceOnEdge;
  }
  
  return {
    speed: speed * PIXEL_RATIO,
    speedSync,
    angle,
    straight,
    bounce,
    bounceOnEdge
  };
}
