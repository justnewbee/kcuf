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
    return state;
  }
}
