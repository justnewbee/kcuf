import _clamp from 'lodash/clamp';
import _round from 'lodash/round';

export default function normalizePercentage(percentage: number): number {
  return _clamp(_round(percentage, 1), 0, 100);
}
