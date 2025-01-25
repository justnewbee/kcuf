import {
  IModelState
} from '../types';

export default function reduceTogglePolishedGrayscale(state: IModelState): IModelState {
  return {
    ...state,
    polishedGrayscale: !state.polishedGrayscale
  };
}
