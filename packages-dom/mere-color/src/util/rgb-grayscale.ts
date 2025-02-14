import {
  IRgb
} from '../types';

export default function rgbGrayscale(rgb: IRgb): IRgb {
  const {
    r,
    g,
    b,
    a
  } = rgb;
  const gray = r * 0.3 + g * 0.59 + b * 0.11;
  
  return {
    r: gray,
    g: gray,
    b: gray,
    a
  };
}
