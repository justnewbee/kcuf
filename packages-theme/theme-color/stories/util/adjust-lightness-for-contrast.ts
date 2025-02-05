import {
  parseToHsl,
  getContrast
} from 'polished';

import composeHslColorString from './compose-hsl-color-string';

interface IOptions {
  dark?: boolean;
  min?: number;
  max?: number;
  steps?: number;
}

export default function adjustLightnessForContrast(color: string, desiredContrast: number, options: IOptions = {}): string {
  const {
    hue,
    saturation
  } = parseToHsl(color);
  const h = Math.round(hue);
  const {
    dark,
    min = 0,
    max = 1,
    steps = 100
  } = options;
  const backgroundColor = dark ? '#000' : '#fff';
  let minLightness = min;
  let maxLightness = max;
  let targetLightness = (min + max) / 2;
  
  for (let i = 0; i < steps; i++) {
    const color2 = composeHslColorString(h, saturation, targetLightness);
    const contrast = getContrast(color2, backgroundColor);
    
    if (Math.abs(contrast - desiredContrast) < 0.001) {
      return color2;
    }
    
    if (contrast > desiredContrast) {
      minLightness = targetLightness;
    } else {
      maxLightness = targetLightness;
    }
    
    targetLightness = (minLightness + maxLightness) / 2;
  }
  
  return composeHslColorString(h, saturation, targetLightness);
}
