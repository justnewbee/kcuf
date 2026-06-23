import {
  useMemo
} from 'react';

import {
  fade
} from '../../../../src';

import useModelState from './_use-model-state';

export default function useColorInputWithAlpha(): string {
  const {
    colorInput,
    colorAlpha
  } = useModelState();
  
  return useMemo(() => fade(colorInput, colorAlpha), [colorInput, colorAlpha]);
}
