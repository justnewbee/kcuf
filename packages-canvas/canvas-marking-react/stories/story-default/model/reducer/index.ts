import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceToggleDestroyed from './reduce-toggle-destroyed';
import reduceToggleDebugEvents from './reduce-toggle-debug-events';
import reduceTogglePlugin from './reduce-toggle-plugin';
import reduceSetDataType from './reduce-set-data-type';
import reduceSetMarkingStats from './reduce-set-marking-stats';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.TOGGLE_DESTROYED:
    return reduceToggleDestroyed(state);
  case EAction.TOGGLE_DEBUG_EVENTS:
    return reduceToggleDebugEvents(state);
  case EAction.TOGGLE_PLUGIN:
    return reduceTogglePlugin(state, action.payload);
  case EAction.SET_DATA_TYPE:
    return reduceSetDataType(state, action.payload);
  case EAction.SET_MARKING_STATS:
    return reduceSetMarkingStats(state, action.payload);
  default:
    return state;
  }
}
