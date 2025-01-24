import {
  IModelState
} from '../types';

export default function reduceSetHueOffset(state: IModelState, payload: number): IModelState {
  return {
    ...state,
    hueOffset: payload
  };
}
