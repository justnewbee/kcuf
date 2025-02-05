import {
  IModelState
} from '../types';

export default function reduceSetSeedColorful(state: IModelState, payload: string): IModelState {
  return {
    ...state,
    seedColorful: payload
  };
}
