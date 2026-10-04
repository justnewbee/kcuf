import {
  EKeyboardCode
} from '../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useActiveCodes(): EKeyboardCode[] {
  const {
    activeCodes: activeCodesInProps
  } = useModelProps();
  const {
    activeCodes: activeCodesInState
  } = useModelState();
  
  return [...activeCodesInProps ?? [], ...activeCodesInState];
}
