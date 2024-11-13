import {
  IKeyboardModifiers
} from '../types';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useActiveModifiers(): IKeyboardModifiers {
  const {
    activeModifiers: activeModifiersInProps
  } = useModelProps();
  const {
    activeModifiers: activeModifiersInState
  } = useModelState();
  
  if (activeModifiersInProps === true || !activeModifiersInProps) {
    return activeModifiersInState;
  }
  
  return activeModifiersInProps;
}
