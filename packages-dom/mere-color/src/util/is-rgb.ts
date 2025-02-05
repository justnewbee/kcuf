import {
  IColorRgb
} from '../types';

export default function isRgb(o: object): o is IColorRgb {
  const color = o as Record<string, unknown>;
  
  return typeof (color as Record<string, unknown>).r === 'number'
    && typeof color.g === 'number'
    && typeof color.b === 'number';
}
