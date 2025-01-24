import {
  IModelState
} from '../types';

export default function reduceToggleDark(state: IModelState): IModelState {
  return {
    ...state,
    dark: !state.dark
  };
}
