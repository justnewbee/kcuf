import {
  EParticleShape
} from '../enum';

import randomArrayItem from './random-array-item';

export default function getNewParticleShape(shape: EParticleShape[]): EParticleShape {
  return randomArrayItem(shape) || EParticleShape.CIRCLE;
}
