import {
  toStringRgb,
  toStringHsl
} from '../../../../src';

import useModelState from './_use-model-state';

export default function useColor(): string {
  const {
    color,
    colorType
  } = useModelState();
  
  switch (colorType) {
  case 'rgb':
    return toStringRgb(color);
  case 'hsl':
    return toStringHsl(color);
  default:
    return color;
  }
}
