import {
  IParticlesParsedConfig
} from '../types';

export default function getNewParticleSpeedOpacity(animateOpacity: IParticlesParsedConfig['animateOpacity']): number {
  if (!animateOpacity) {
    return 0;
  }
  
  const {
    speed,
    speedSync
  } = animateOpacity;
  
  return speedSync ? speed : speed * Math.random();
}