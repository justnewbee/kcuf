import {
  IHsl
} from '../types';

export default function shiftSaturation(hsl: IHsl, amount: number): IHsl {
  return {
    ...hsl,
    s: hsl.s + amount
  };
}
