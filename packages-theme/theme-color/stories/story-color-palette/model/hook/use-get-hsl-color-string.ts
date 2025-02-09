import {
  useCallback
} from 'react';

import {
  toStringHsl
} from '@kcuf/mere-color';

import useModelState from './_use-model-state';

export default function useGetHslColorString(): (hue: number, lightness: number) => string {
  const {
    hueOffset,
    saturation
  } = useModelState();
  
  return useCallback((hue: number, lightness: number) => {
    return toStringHsl(`hsl(${hue + hueOffset} ${saturation}% ${lightness}%)`);
  }, [hueOffset, saturation]);
}
