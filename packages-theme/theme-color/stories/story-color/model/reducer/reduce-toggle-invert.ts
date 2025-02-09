import {
  IModelState
} from '../types';

export default function reduceToggleInvert(state: IModelState): IModelState {
  return {
    ...state,
    invert: !state.invert
  };
}
