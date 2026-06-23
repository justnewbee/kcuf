import {
  IModelState
} from '../types';

export default function reduceSetColorAlpha(state: IModelState, payload: number): IModelState {
  return {
    ...state,
    colorAlpha: payload
  };
}
