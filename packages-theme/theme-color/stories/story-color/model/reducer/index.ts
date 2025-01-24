import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceToggleDark from './reduce-toggle-dark';
import reduceToggleText from './reduce-toggle-text';
import reduceToggleGrayscale from './reduce-toggle-grayscale';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.TOGGLE_DARK:
    return reduceToggleDark(state);
  case EAction.TOGGLE_TEXT:
    return reduceToggleText(state);
  case EAction.TOGGLE_GRAYSCALE:
    return reduceToggleGrayscale(state);
  default:
    return state;
  }
}
