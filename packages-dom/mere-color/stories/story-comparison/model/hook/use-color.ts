import {
  useMemo
} from 'react';

import {
  fade,
  toStringRgb,
  toStringHsl
} from '../../../../src';

import useModelState from './_use-model-state';

export default function useColor(): string {
  const {
    color,
    colorAlpha,
    colorType
  } = useModelState();
  
  return useMemo(() => {
    switch (colorType) {
    case 'rgb':
      return fade(toStringRgb(color), colorAlpha);
    case 'hsl':
      return fade(toStringHsl(color), colorAlpha);
    default:
      return fade(color, colorAlpha);
    }
  }, [color, colorAlpha, colorType]);
}
