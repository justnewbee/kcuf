import {
  getColorNotation,
  computeLuminance,
  computeContrast,
  fromHslToRgb,
  toColorString
} from '../util';
import {
  parseToHsl
} from '../parse';
import {
  a11yLuminance
} from '../a11y';

interface IOptions {
  bgc?: string;
  steps?: number;
  minLightness?: number;
  maxLightness?: number;
}

/**
 * Adjust the color's lightness to meet target contrast, returning the new color in the original notation normalized.
 */
export default function adjustContrast(color: string, targetContrast: number, options: IOptions = {}): string {
  const hsl = parseToHsl(color);
  
  if (!hsl) {
    return color;
  }
  
  const {
    bgc = '#fff',
    steps = 100,
    minLightness = 0,
    maxLightness = 100
  } = options;
  const bgcLuminance = a11yLuminance(bgc);
  
  if (bgcLuminance < 0) {
    return color;
  }
  
  let minL = minLightness;
  let maxL = maxLightness;
  let targetLightness = (minLightness + maxLightness) / 2;
  
  for (let i = 0; i < steps; i++) {
    const rgb = fromHslToRgb({
      ...hsl,
      l: targetLightness
    });
    const contrast = computeContrast(computeLuminance(rgb), bgcLuminance);
    
    if (Math.abs(contrast - targetContrast) < 0.001) {
      return toColorString(rgb, getColorNotation(color));
    }
    
    if (contrast > targetContrast) {
      minL = targetLightness;
    } else {
      maxL = targetLightness;
    }
    
    targetLightness = (minL + maxL) / 2;
  }
  
  return toColorString({
    ...hsl,
    l: targetLightness
  }, getColorNotation(color));
}
