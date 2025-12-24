import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetCodemirrorInfo from './reduce-set-codemirror-info';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  case EAction.SET_CODEMIRROR_INFO:
    return reduceSetCodemirrorInfo(state, action.payload);
  default: // 如果 default 里 action 的类型没有 narrow 到 never，则 type 未 cover 全
    return state;
  }
}
