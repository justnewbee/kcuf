import {
  IHsl
} from '../types';

export default function shiftLightness(hsl: IHsl, amount: number): IHsl {
  return {
    ...hsl,
    l: hsl.l + amount
  };
}
