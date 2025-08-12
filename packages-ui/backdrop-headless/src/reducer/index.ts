import {
  IModelState,
  IModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceRefreshVisible from './reduce-refresh-visible';

export default function reducer(state: IModelState, action: IModelAction): IModelState {
  switch (action.type) {
  case EAction.REFRESH_VISIBLE:
    return reduceRefreshVisible(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则说明 type 没有 cover 全
    return state;
  }
}
