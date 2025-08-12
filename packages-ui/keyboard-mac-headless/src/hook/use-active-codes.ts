import {
  useMemo
} from 'react';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useActiveCodes(): string[] {
  const {
    activeCodes: activeCodesInProps
  } = useModelProps();
  const {
    activeCodes: activeCodesInState
  } = useModelState();
  
  return useMemo(() => [...activeCodesInProps || [], ...activeCodesInState], [activeCodesInProps, activeCodesInState]);
}
