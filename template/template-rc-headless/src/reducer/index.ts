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
  default:
    // // eslint-disable-next-line no-case-declarations
    // const type: never = action.type; // 如果这里 `.type` 没有报错，则说明 type 没有 cover 全
    return state;
  }
}
