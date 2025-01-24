import {
  IModelState
} from '../types';

export default function reduceSetDark(state: IModelState, payload: boolean): IModelState {
  return {
    ...state,
    dark: payload
  };
}
