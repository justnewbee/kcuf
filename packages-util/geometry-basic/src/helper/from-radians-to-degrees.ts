import {
  round as _round
} from 'lodash-es';

export default function fromRadiansToDegrees(radians: number): number {
  return _round(radians * 180 / Math.PI, 1);
}