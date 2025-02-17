import {
  fade
} from '@kcuf/mere-color';

export default function parseConfigColor(baseColor: string, configColor?: number | string): string {
  if (typeof configColor === 'string') {
    return configColor;
  }
  
  if (typeof configColor === 'number') {
    return fade(baseColor, configColor);
  }
  
  return baseColor;
}
