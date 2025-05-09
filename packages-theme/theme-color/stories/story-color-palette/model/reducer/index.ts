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
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则说明 type 没有 cover 全
    return state;
  }
}
