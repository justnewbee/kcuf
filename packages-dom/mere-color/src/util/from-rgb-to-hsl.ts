import {
  IRgb,
  IHsl
} from '../types';

export default function fromRgbToHsl(rgb: IRgb): IHsl {
  const red = rgb.r / 255;
  const green = rgb.g / 255;
  const blue = rgb.b / 255;
  
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  
  if (max === min) { // achromatic
    return {
      h: 0,
      s: 0,
      l: lightness * 100,
      a: rgb.a
    };
  }
  
  let hue;
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  
  switch (max) {
  case red:
    hue = (green - blue) / delta + (green < blue ? 6 : 0);
    
    break;
  case green:
    hue = (blue - red) / delta + 2;
    
    break;
  default:
    // blue case
    hue = (red - green) / delta + 4;
    
    break;
  }
  
  return {
    h: hue * 60,
    s: saturation * 100,
    l: lightness * 100,
    a: rgb.a
  };
}
