import {
  IModifierState
} from '../types';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useModifierState(): IModifierState {
  const {
    modifierState: modifierStateInProps
  } = useModelProps();
  const {
    modifierState: modifierStateInState
  } = useModelState();
  
  if (modifierStateInProps === true || !modifierStateInProps) {
    return modifierStateInState;
  }
  
  return modifierStateInProps;
}