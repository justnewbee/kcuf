import {
  IModelState
} from '../types';

export default function reduceTogglePolishedInvert(state: IModelState): IModelState {
  return {
    ...state,
    polishedInvert: !state.polishedInvert
  };
}
