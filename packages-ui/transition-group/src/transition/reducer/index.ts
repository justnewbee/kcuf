import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetStatus from './reduce-set-status';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_STATUS:
    return reduceSetStatus(state, action.payload);
  default:
    return state;
  }
}
