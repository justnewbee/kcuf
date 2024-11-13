import {
  TConfigColor,
  TColorValue
} from '../types';

import randomArrayItem from './random-array-item';
import random360 from './random-360';
import random255 from './random-255';
import hexToRgb from './hex-to-rgb';

export class Color {
  private type: 'rgb' | 'hsl';
  private value: [number, number, number];
  
  constructor(value?: TColorValue) {
    if (!value || value === 'random') {
      this.type = 'hsl';
      this.value = [random360(), 100, 50]; // https://www.w3school.com.cn/css/css_colors_hsl.asp
      
      return;
    }
    
    if (value === 'all') {
      this.type = 'rgb';
      this.value = [random255(), random255(), random255()];
      
      return;
    }
    
    this.type = 'rgb';
    this.value = hexToRgb(value);
  }
  
  toColorString(alpha = 100): string {
    const {
      type,
      value: [v1, v2, v3]
    } = this;
    const a = alpha >= 100 ? '' : ` / ${alpha}%`;
    
    return type === 'rgb' ? `rgb(${v1} ${v2} ${v3}${a})` : `hsl(${v1} ${v2}% ${v3}%${a})`;
  }
}

export default function createColor(color?: TConfigColor): Color {
  return new Color(Array.isArray(color) ? randomArrayItem(color) : color);
}
