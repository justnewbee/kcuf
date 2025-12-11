import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceInit from './reduce-init';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  case EAction.INIT:
    return reduceInit(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则说明 type 没有 cover 全
    return state;
  }
}
