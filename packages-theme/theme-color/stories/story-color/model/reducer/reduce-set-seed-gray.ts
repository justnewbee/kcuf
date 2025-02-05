import {
  IModelState
} from '../types';

export default function reduceSetSeedGray(state: IModelState, payload: string): IModelState {
  return {
    ...state,
    seedGray: payload
  };
}
