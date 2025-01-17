import {
  IModelState
} from '../types';

export default function createInitialState(value: string): IModelState {
  return {
    domInput: null,
    value,
    hovered: false,
    focused: false,
    composing: false
  };
}
