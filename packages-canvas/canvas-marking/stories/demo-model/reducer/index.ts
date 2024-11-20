import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetEverInit from './reduce-set-ever-init';
import reduceSetDomContainer from './reduce-set-dom-container';
import reduceSetDomMarking from './reduce-set-dom-marking';
import reduceSetCanvasMarking from './reduce-set-marking-stage';
import reduceSetCanvasMarkingStats from './reduce-set-marking-stage-stats';
import reduceToggleLogEvents from './reduce-toggle-log-events';
import reduceToggleFullscreen from './reduce-toggle-fullscreen';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_EVER_INIT:
    return reduceSetEverInit(state);
  case EAction.SET_DOM_CONTAINER:
    return reduceSetDomContainer(state, action.payload);
  case EAction.SET_DOM_MARKING:
    return reduceSetDomMarking(state, action.payload);
  case EAction.SET_MARKING_INSTANCE:
    return reduceSetCanvasMarking(state, action.payload);
  case EAction.SET_MARKING_STATS:
    return reduceSetCanvasMarkingStats(state, action.payload);
  case EAction.TOGGLE_LOG_EVENTS:
    return reduceToggleLogEvents(state, action.payload);
  case EAction.TOGGLE_FULLSCREEN:
    return reduceToggleFullscreen(state, action.payload);
  default:
    return state;
  }
}
