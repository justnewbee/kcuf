import {
  IHsv
} from '../types';

export default function isHsv(o: object): o is IHsv {
  const color = o as Record<string, unknown>;
  
  return typeof (color as Record<string, unknown>).h === 'number'
    && typeof color.s === 'number'
    && typeof color.v === 'number';
}
