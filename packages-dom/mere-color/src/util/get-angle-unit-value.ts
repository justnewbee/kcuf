import {
  EHueUnit
} from '../enum';

const TURN = 360;
const GRAD = TURN / 400;
const RAD = TURN / (Math.PI * 2);

export default function getAngleUnitValue(unit?: string): number {
  switch (unit?.toLowerCase()) {
  case EHueUnit.RADIAN:
    return RAD;
  case EHueUnit.GRADIAN:
    return GRAD;
  case EHueUnit.TURN:
    return TURN;
  default:
    return 1;
  }
}
