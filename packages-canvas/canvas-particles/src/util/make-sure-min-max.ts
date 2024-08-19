import {
  TRange
} from '../types';

export default function makeSureMinMax(minMax: TRange): TRange {
  const [min, max] = minMax;
  
  return min <= max ? minMax : [max, min];
}