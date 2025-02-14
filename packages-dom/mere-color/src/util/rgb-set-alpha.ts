import {
  IRgb
} from '../types';

export default function rgbSetAlpha(rgb: IRgb, a: number): IRgb {
  return {
    ...rgb,
    a
  };
}
