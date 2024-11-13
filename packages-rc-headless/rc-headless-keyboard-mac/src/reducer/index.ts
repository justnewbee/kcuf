import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reducePushActiveCode from './reduce-push-active-code';
import reducePullActiveCode from './reduce-pull-active-code';
import reduceSetCapsLock from './reduce-set-caps-lock';
import reduceSetKeyDetails from './reduce-set-key-details';
import reduceUpdateActiveModifiers from './reduce-update-active-modifiers';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.PUSH_ACTIVE_CODE:
    return reducePushActiveCode(state, action.payload);
  case EAction.PULL_ACTIVE_CODE:
    return reducePullActiveCode(state, action.payload);
  case EAction.SET_CAPS_LOCK:
    return reduceSetCapsLock(state, action.payload);
  case EAction.SET_KEY_DETAILS:
    return reduceSetKeyDetails(state, action.payload);
  case EAction.UPDATE_ACTIVE_MODIFIERS:
    return reduceUpdateActiveModifiers(state, action.payload);
  default:
    return state;
  }
}
