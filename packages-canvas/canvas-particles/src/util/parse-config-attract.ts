import {
  IConfigAttract,
  IParticlesConfig
} from '../types';
import {
  PIXEL_RATIO
} from '../const';

export default function parseConfigAttract(attract: IParticlesConfig['attract']): IConfigAttract | null {
  if (!attract) {
    return null;
  }
  
  return attract.distance > 0 ? {
    distance: attract.distance * PIXEL_RATIO,
    rotateX: attract.rotateX,
    rotateY: attract.rotateY
  } : null;
}