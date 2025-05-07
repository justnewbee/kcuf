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
  default:
    // // eslint-disable-next-line no-case-declarations
    // const type: never = action.type; // 如果这里 `.type` 没有报错，则说明 type 没有 cover 全
    return state;
  }
}
