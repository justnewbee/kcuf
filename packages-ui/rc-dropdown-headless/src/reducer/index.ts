import {
  EAction
} from '../enum';
import {
  IModelState,
  TModelAction
} from '../types';

import reduceSetDomDropdown from './reduce-set-dom-dropdown';
import reduceSetDomDrop from './reduce-set-dom-drop';
import reduceSetVisible from './reduce-set-visible';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DOM_DROPDOWN:
    return reduceSetDomDropdown(state, action.payload);
  case EAction.SET_DOM_DROP:
    return reduceSetDomDrop(state, action.payload);
  case EAction.SET_VISIBLE:
    return reduceSetVisible(state, action.payload);
  default:
    // // eslint-disable-next-line no-case-declarations
    // const type: never = action.type; // 如果这里 `.type` 没有报错，则说明 type 没有 cover 全
    return state;
  }
}
