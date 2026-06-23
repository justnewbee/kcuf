import {
  IModelState
} from '../types';

export default function reduceSetColorInput(state: IModelState, payload: string): IModelState {
  return {
    ...state,
    colorInput: payload
  };
}
