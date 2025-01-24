import {
  useCallback
} from 'react';
import {
  hsl
} from 'polished';

import {
  toHslColorString
} from '../../../util';

import useModelState from './_use-model-state';

export default function useGetHslColorString(): (hue: number, lightness: number) => string {
  const {
    saturation,
    hueOffset
  } = useModelState();
  
  return useCallback((hue: number, lightness: number) => {
    return toHslColorString(hsl(hue + hueOffset, saturation * 0.01, lightness * 0.01));
  }, [saturation, hueOffset]);
}
