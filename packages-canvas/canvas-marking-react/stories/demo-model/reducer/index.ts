import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceToggleDisabled from './reduce-toggle-disabled';
import reduceToggleDestroyed from './reduce-toggle-destroyed';
import reduceSetDataType from './reduce-set-data-type';
import reduceSetStats from './reduce-set-stats';
import reduceTogglePlugin from './reduce-toggle-plugin';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.TOGGLE_DISABLED:
    return reduceToggleDisabled(state);
  case EAction.TOGGLE_DESTROYED:
    return reduceToggleDestroyed(state);
  case EAction.SET_DATA_TYPE:
    return reduceSetDataType(state, action.payload);
  case EAction.SET_STATS:
    return reduceSetStats(state, action.payload);
  case EAction.TOGGLE_PLUGIN:
    return reduceTogglePlugin(state, action.payload);
  default:
    return state;
  }
}
