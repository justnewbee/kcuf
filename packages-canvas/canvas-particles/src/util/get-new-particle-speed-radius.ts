import {
  IParticlesParsedConfig
} from '../types';

export default function getNewParticleSpeedRadius(animateRadius: IParticlesParsedConfig['animateRadius']): number {
  if (!animateRadius) {
    return 0;
  }
  
  const {
    speed,
    speedSync
  } = animateRadius;
  
  return speedSync ? speed : speed * Math.random();
}