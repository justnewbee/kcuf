import {
  IModelState
} from '../types';

export default function reduceSetColorType(state: IModelState, payload: string): IModelState {
  return {
    ...state,
    colorType: payload
  };
}
