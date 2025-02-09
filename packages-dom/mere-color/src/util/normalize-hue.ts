import _round from 'lodash/round';

export default function normalizeHue(hue: number): number {
  let h = hue % 360;
  
  if (h < 0) {
    h += 360;
  }
  
  return _round(h, 1);
}
