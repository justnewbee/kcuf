import {
  IHsl
} from '../types';

export default function adjustLightness(hsl: IHsl, amount: number): IHsl {
  return {
    ...hsl,
    l: hsl.l + amount
  };
}
