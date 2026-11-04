import {
  IFluidColor
} from '../types';

/**
 * Converts a hue in the `0 - 1` range to a fully saturated color.
 */
export default function hsvToRgb(hue: number): IFluidColor {
  const sector = Math.floor(hue * 6);
  const fraction = hue * 6 - sector;
  const inverted = 1 - fraction;
  let r = 0;
  let g = 0;
  let b = 0;
  
  switch (sector % 6) {
  case 0:
    r = 1;
    g = fraction;
    
    break;
  case 1:
    r = inverted;
    g = 1;
    
    break;
  case 2:
    g = 1;
    b = fraction;
    
    break;
  case 3:
    g = inverted;
    b = 1;
    
    break;
  case 4:
    r = fraction;
    b = 1;
    
    break;
  case 5:
    r = 1;
    b = inverted;
    
    break;
  }
  
  return {
    r,
    g,
    b
  };
}
