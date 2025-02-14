import {
  EHueUnit
} from '../enum';
import {
  IHsl
} from '../types';

import getAngleUnitValue from './get-angle-unit-value';

export default function hslShiftHue(hsl: IHsl, delta: number, unit?: `${EHueUnit}`): IHsl {
  return {
    ...hsl,
    h: hsl.h + delta * getAngleUnitValue(unit)
  };
}
