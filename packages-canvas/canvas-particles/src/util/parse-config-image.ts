import {
  IConfigImage,
  IParticlesConfig
} from '../types';

export default function parseConfigImage(image: IParticlesConfig['image']): IConfigImage | null {
  if (!image) {
    return null;
  }
  
  if (typeof image === 'string') {
    return {
      src: image
    };
  }
  
  return image.src ? image : null;
}