import {
  IHsl
} from '../types';

export default function hslShiftSaturation(hsl: IHsl, delta: number): IHsl {
  return {
    ...hsl,
    s: hsl.s + delta
  };
}
