import {
  IHsl
} from '../types';

export default function hslShiftLightness(hsl: IHsl, delta: number): IHsl {
  return {
    ...hsl,
    l: hsl.l + delta
  };
}
