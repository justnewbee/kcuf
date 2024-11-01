import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceRefreshVisible from './reduce-refresh-visible';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
    case EAction.REFRESH_VISIBLE:
      return reduceRefreshVisible(state);
    default:
      return state;
  }
}
