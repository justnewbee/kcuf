import _clamp from 'lodash/clamp';
import _round from 'lodash/round';

/**
 * Normalizes alpha value between `[0, 100]` with precision 1.
 */
export default function normalizeAlpha(n: number | undefined): number | undefined {
  if (n === undefined) {
    return undefined;
  }
  
  return _clamp(_round(n, 1), 0, 100);
}
