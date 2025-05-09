import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetXx from './reduce-set-xx';
import reduceSetYy from './reduce-set-yy';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_XX:
    return reduceSetXx(state, action.payload);
  case EAction.SET_YY:
    return reduceSetYy(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则说明 type 没有 cover 全
    return state;
  }
}
