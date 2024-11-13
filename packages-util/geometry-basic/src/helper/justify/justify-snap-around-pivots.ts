import {
  TPoint,
  IJustifySnapResult
} from '../../types';

import justifySnapAroundPivot from './justify-snap-around-pivot';
import determineJustifiedResult from './_determine-justified-result';

export default function justifySnapAroundPivots(point: TPoint, pivots: (TPoint | null | undefined)[], steps?: number): IJustifySnapResult | null {
  return determineJustifiedResult(pivots.map(v => (v ? justifySnapAroundPivot(point, v, steps) : null)));
}
