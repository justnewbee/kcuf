import {
  TSize
} from '../types';

export default function roundSize(size: TSize): TSize {
  return [Math.round(size[0]), Math.round(size[1])];
}
