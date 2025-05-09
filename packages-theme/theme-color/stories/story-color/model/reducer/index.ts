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
import reduceToggleInvert from './reduce-toggle-invert';
import reduceSetSeedGray from './reduce-set-seed-gray';
import reduceSetSeedColorful from './reduce-set-seed-colorful';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.TOGGLE_DARK:
    return reduceToggleDark(state);
  case EAction.TOGGLE_TEXT:
    return reduceToggleText(state);
  case EAction.TOGGLE_GRAYSCALE:
    return reduceToggleGrayscale(state);
  case EAction.TOGGLE_INVERT:
    return reduceToggleInvert(state);
  case EAction.SET_SEED_GRAY:
    return reduceSetSeedGray(state, action.payload);
  case EAction.SET_SEED_COLORFUL:
    return reduceSetSeedColorful(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则说明 type 没有 cover 全
    return state;
  }
}
