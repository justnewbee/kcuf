import {
  IFluidColor
} from '../types';

import hsvToRgb from './hsv-to-rgb';

/**
 * The dye is quite faint on its own, a fraction of the hue is enough for a splat.
 */
export default function generateColor(): IFluidColor {
  const color = hsvToRgb(Math.random());
  
  return {
    r: color.r * 0.15,
    g: color.g * 0.15,
    b: color.b * 0.15
  };
}
