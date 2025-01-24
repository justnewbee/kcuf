import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetDark from './reduce-set-dark';
import reduceSetSaturation from './reduce-set-saturation';
import reduceSetHueOffset from './reduce-set-hue-offset';
import reduceSetSelectedHueLightness from './reduce-set-selected-hue-lightness';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DARK:
    return reduceSetDark(state, action.payload);
  case EAction.SET_SATURATION:
    return reduceSetSaturation(state, action.payload);
  case EAction.SET_HUE_OFFSET:
    return reduceSetHueOffset(state, action.payload);
  case EAction.SET_SELECTED_HUE_LIGHTNESS:
    return reduceSetSelectedHueLightness(state, action.payload);
  default:
    return state;
  }
}
