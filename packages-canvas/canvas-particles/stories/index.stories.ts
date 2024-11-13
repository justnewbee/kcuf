import {
  TMeta
} from './types';
import Particles from './rc/particles';

import './index.css';

export { default as Default } from './story-default';
export { default as PresetOfficial } from './story-official';
export { default as PresetSnow } from './story-snow';
export { default as PresetFirefly } from './story-firefly';
export { default as PresetRandom } from './story-random';
export { default as PresetStar } from './story-star';
export { default as PresetImage } from './story-image';
export { default as PresetImageSvg } from './story-image-svg';

export default {
  title: 'Particles',
  component: Particles,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
} satisfies TMeta;
