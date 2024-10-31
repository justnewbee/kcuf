import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetCodes from './reduce-set-codes';
import reduceSetCapsLock from './reduce-set-caps-lock';
import reduceSetKeyDetails from './reduce-set-key-details';
import reduceUpdateModifierState from './reduce-update-modifier-state';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
    case EAction.SET_CODES:
      return reduceSetCodes(state, action.payload);
    case EAction.SET_CAPS_LOCK:
      return reduceSetCapsLock(state, action.payload);
    case EAction.SET_KEY_DETAILS:
      return reduceSetKeyDetails(state, action.payload);
    case EAction.UPDATE_MODIFIER_STATE:
      return reduceUpdateModifierState(state, action.payload);
    default:
      return state;
  }
}
