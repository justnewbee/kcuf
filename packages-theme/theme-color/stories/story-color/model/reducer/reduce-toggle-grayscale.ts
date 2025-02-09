import {
  IModelState
} from '../types';

export default function reduceToggleGrayscale(state: IModelState): IModelState {
  return {
    ...state,
    grayscale: !state.grayscale
  };
}
