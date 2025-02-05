import _round from 'lodash/round';
import _clamp from 'lodash/clamp';

export default function normalizeHue(hue: number): number {
  return _clamp(_round(hue % 360, 1), 0, 360);
}
