import {
  useMemo
} from 'react';

import {
  toStringRgb,
  toStringHsl
} from '../../../../src';

import useModelState from './_use-model-state';
import useColorInputWithAlpha from './use-color-input-with-alpha';

export default function useColor(): string {
  const {
    colorNotation
  } = useModelState();
  const colorInputWithAlpha = useColorInputWithAlpha();
  
  return useMemo(() => {
    switch (colorNotation) {
    case 'rgb':
      return toStringRgb(colorInputWithAlpha);
    case 'hsl':
      return toStringHsl(colorInputWithAlpha);
    default:
      return colorInputWithAlpha;
    }
  }, [colorInputWithAlpha, colorNotation]);
}
