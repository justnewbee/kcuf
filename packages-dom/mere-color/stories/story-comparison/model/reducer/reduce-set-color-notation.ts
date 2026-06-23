import {
  IModelState
} from '../types';

export default function reduceSetColorNotation(state: IModelState, payload: string): IModelState {
  return {
    ...state,
    colorNotation: payload
  };
}
