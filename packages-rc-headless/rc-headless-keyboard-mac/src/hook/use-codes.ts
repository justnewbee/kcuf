import {
  useMemo
} from 'react';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useCodes(): string[] {
  const {
    codes: codesInProps
  } = useModelProps();
  const {
    codes: codesInState
  } = useModelState();
  
  return useMemo(() => [...codesInProps || [], ...codesInState], [codesInProps, codesInState]);
}