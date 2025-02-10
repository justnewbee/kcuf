import {
  IModelState
} from '../types';

export default function reduceSetColor(state: IModelState, payload: string): IModelState {
  return {
    ...state,
    color: payload
  };
}
