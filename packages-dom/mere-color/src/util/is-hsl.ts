import {
  IHsl
} from '../types';

export default function isHsl(o: object): o is IHsl {
  const color = o as Record<string, unknown>;
  
  return typeof (color as Record<string, unknown>).h === 'number'
    && typeof color.s === 'number'
    && typeof color.l === 'number';
}
