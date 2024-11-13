import {
  EParticleShape
} from '../enum';
import {
  IParticlesConfig,
  TParsedConfigShape
} from '../types';

const DEFAULT: TParsedConfigShape = [EParticleShape.CIRCLE];

export default function parseConfigShape(shape: IParticlesConfig['shape']): TParsedConfigShape {
  if (!shape) {
    return DEFAULT;
  }
  
  if (Array.isArray(shape)) {
    return shape.length ? shape as TParsedConfigShape : DEFAULT;
  }
  
  if (shape === 'random') {
    return [
      EParticleShape.CIRCLE,
      EParticleShape.TRIANGLE,
      EParticleShape.SQUARE,
      EParticleShape.PENTAGON,
      EParticleShape.HEXAGON,
      EParticleShape.STAR,
      EParticleShape.STAR_7
    ];
  }
  
  return [shape] as TParsedConfigShape;
}
