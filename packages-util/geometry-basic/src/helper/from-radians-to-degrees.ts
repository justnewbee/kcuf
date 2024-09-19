import _round from 'lodash/round';

export default function fromRadiansToDegrees(radians: number): number {
  return _round(radians * 180 / Math.PI, 4);
}