import {
  TConfigColor
} from '../types';
import {
  DEFAULT_COLOR
} from '../const';

import createColor, {
  Color
} from './create-color';

export default function getNewParticleColor(color?: TConfigColor): Color {
  return createColor(color || DEFAULT_COLOR);
}
