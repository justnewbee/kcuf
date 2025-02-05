import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceToggleDark from './reduce-toggle-dark';
import reduceToggleText from './reduce-toggle-text';
import reduceTogglePolishedGrayscale from './reduce-toggle-polished-grayscale';
import reduceTogglePolishedInvert from './reduce-toggle-polished-invert';
import reduceSetSeedGray from './reduce-set-seed-gray';
import reduceSetSeedColorful from './reduce-set-seed-colorful';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.TOGGLE_DARK:
    return reduceToggleDark(state);
  case EAction.TOGGLE_TEXT:
    return reduceToggleText(state);
  case EAction.TOGGLE_POLISHED_GRAYSCALE:
    return reduceTogglePolishedGrayscale(state);
  case EAction.TOGGLE_POLISHED_INVERT:
    return reduceTogglePolishedInvert(state);
  case EAction.SET_SEED_GRAY:
    return reduceSetSeedGray(state, action.payload);
  case EAction.SET_SEED_COLORFUL:
    return reduceSetSeedColorful(state, action.payload);
  default:
    return state;
  }
}
