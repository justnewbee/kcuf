import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetMounted from './reduce-set-mounted';
import reduceSetStatus from './reduce-set-status';
import reduceSetTimer from './reduce-set-timer';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_MOUNTED:
    return reduceSetMounted(state, action.payload);
  case EAction.SET_STATUS:
    return reduceSetStatus(state, action.payload);
  case EAction.SET_TIMER:
    return reduceSetTimer(state, action.payload);
  default:
    return state;
  }
}
