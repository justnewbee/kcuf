import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetDomContainer from './reduce-set-dom-container';
import reduceSetMarkingInstance from './reduce-set-marking-instance';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DOM_CONTAINER:
    return reduceSetDomContainer(state, action.payload);
  case EAction.SET_MARKING_INSTANCE:
    return reduceSetMarkingInstance(state, action.payload);
  default:
    // // eslint-disable-next-line no-case-declarations
    // const type: never = action.type; // 如果这里 `.type` 没有报错，则说明 type 没有 cover 全
    return state;
  }
}
