import _round from 'lodash/round';
import _clamp from 'lodash/clamp';

export default function normalizeHexValue(n: number): number {
  return _clamp(_round(n), 0, 255);
}
