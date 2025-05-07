import {
  EAction
} from '../enum';
import {
  IModelState,
  TModelAction
} from '../types';

import reduceSetDomInput from './reduce-set-dom-input';
import reduceSetValue from './reduce-set-value';
import reduceSetHovered from './reduce-set-hovered';
import reduceSetFocused from './reduce-set-focused';
import reduceSetComposing from './reduce-set-composing';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DOM_INPUT:
    return reduceSetDomInput(state, action.payload);
  case EAction.SET_VALUE:
    return reduceSetValue(state, action.payload);
  case EAction.SET_HOVERED:
    return reduceSetHovered(state, action.payload);
  case EAction.SET_FOCUSED:
    return reduceSetFocused(state, action.payload);
  case EAction.SET_COMPOSING:
    return reduceSetComposing(state, action.payload);
  default:
    // // eslint-disable-next-line no-case-declarations
    // const type: never = action.type; // 如果这里 `.type` 没有报错，则说明 type 没有 cover 全
    return state;
  }
}
