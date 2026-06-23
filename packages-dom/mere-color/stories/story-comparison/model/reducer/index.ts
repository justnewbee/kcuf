import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetColorInput from './reduce-set-color-input';
import reduceSetColorAlpha from './reduce-set-color-alpha';
import reduceSetColorNotation from './reduce-set-color-notation';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_COLOR_INPUT:
    return reduceSetColorInput(state, action.payload);
  case EAction.SET_COLOR_ALPHA:
    return reduceSetColorAlpha(state, action.payload);
  case EAction.SET_COLOR_NOTATION:
    return reduceSetColorNotation(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则 type 未 cover 全
    return state;
  }
}
