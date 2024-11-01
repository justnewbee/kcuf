import {
  IConfigStroke
} from '../types';

import createColor, {
  Color
} from './create-color';

export default function getNewParticleStroke(stroke?: IConfigStroke): [Color, number] | null {
  if (!stroke?.color) {
    return null;
  }
  
  const {
    width = 1,
    color
  } = stroke;
  
  if (width <= 0) {
    return null;
  }
  
  return [createColor(color), width];
}