import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetDomContainer from './reduce-set-dom-container';
import reduceSetDomMarking from './reduce-set-dom-marking';
import reduceSetEverInit from './reduce-set-ever-init';
import reduceLoopOptionEditable from './reduce-loop-option-editable.ts';
import reduceToggleOptionDebugEvents from './reduce-toggle-option-debug-events';
import reduceSetCanvasMarking from './reduce-set-marking-stage';
import reduceSetCanvasMarkingStats from './reduce-set-marking-stage-stats';
import reduceToggleFullscreen from './reduce-toggle-fullscreen';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DOM_CONTAINER:
    return reduceSetDomContainer(state, action.payload);
  case EAction.SET_DOM_MARKING:
    return reduceSetDomMarking(state, action.payload);
  case EAction.SET_EVER_INIT:
    return reduceSetEverInit(state);
  case EAction.LOOP_OPTION_EDITABLE:
    return reduceLoopOptionEditable(state);
  case EAction.TOGGLE_OPTION_DEBUG_EVENTS:
    return reduceToggleOptionDebugEvents(state);
  case EAction.SET_MARKING_INSTANCE:
    return reduceSetCanvasMarking(state, action.payload);
  case EAction.SET_MARKING_STATS:
    return reduceSetCanvasMarkingStats(state, action.payload);
  case EAction.TOGGLE_FULLSCREEN:
    return reduceToggleFullscreen(state, action.payload);
  default:
    return state;
  }
}
