import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetColor from './reduce-set-color';
import reduceSetColorType from './reduce-set-color-type';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_COLOR:
    return reduceSetColor(state, action.payload);
  case EAction.SET_COLOR_TYPE:
    return reduceSetColorType(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则说明 type 没有 cover 全
    return state;
  }
}
