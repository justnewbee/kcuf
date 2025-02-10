import {
  EHueUnit
} from '../enum';
import {
  IHsl
} from '../types';

import getAngleUnitValue from './get-angle-unit-value';

export default function shiftHue(hsl: IHsl, amount: number, unit?: `${EHueUnit}`): IHsl {
  return {
    ...hsl,
    h: hsl.h + amount * getAngleUnitValue(unit)
  };
}
