import {
  TAngle
} from '../../types';
import {
  fromRadiansToDegrees
} from '../../util';

import angleRadians from './angle-radians';

/**
 * 角度数，默认范围 `[0°, 360°)`，若传入 `undirected: true`，范围为 `[0°, 180°]`
 */
export default function angleDegrees(angle: TAngle, undirected?: boolean): number {
  return fromRadiansToDegrees(angleRadians(angle, undirected));
}
