import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetCodes from './reduce-set-codes';
import reduceSetCapsLock from './reduce-set-caps-lock';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
    case EAction.SET_CODES:
      return reduceSetCodes(state, action.payload);
    case EAction.SET_CAPS_LOCK:
      return reduceSetCapsLock(state, action.payload);
    default:
      return state;
  }
}
