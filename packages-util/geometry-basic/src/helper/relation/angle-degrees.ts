import {
  TAngle
} from '../../types';
import {
  fromRadiansToDegrees
} from '../../util';

import angleRadians from './angle-radians';

/**
 * 角度数 [0°, 360°)
 */
export default function angleDegrees(angle: TAngle): number {
  return fromRadiansToDegrees(angleRadians(angle));
}