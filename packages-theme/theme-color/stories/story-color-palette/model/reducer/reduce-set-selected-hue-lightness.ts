import {
  IModelState
} from '../types';

export default function reduceSetSelectedHueLightness(state: IModelState, payload: [number, number]): IModelState {
  return {
    ...state,
    selectedHueLightness: payload
  };
}
