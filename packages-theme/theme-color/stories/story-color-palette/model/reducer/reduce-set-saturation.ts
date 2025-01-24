import {
  IModelState
} from '../types';

export default function reduceSetSaturation(state: IModelState, payload: number): IModelState {
  return {
    ...state,
    saturation: payload
  };
}
