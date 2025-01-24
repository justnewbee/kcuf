import {
  IModelState
} from '../types';

export default function reduceToggleText(state: IModelState): IModelState {
  return {
    ...state,
    text: !state.text
  };
}
