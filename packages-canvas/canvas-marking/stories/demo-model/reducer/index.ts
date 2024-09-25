import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetDomContainer from './reduce-set-dom-container';
import reduceSetDomMarking from './reduce-set-dom-marking';
import reduceSetMarkingStage from './reduce-set-marking-stage';
import reduceSetMarkingStageStats from './reduce-set-marking-stage-stats';
import reduceToggleLogEvents from './reduce-toggle-log-events';
import reduceToggleFullscreen from './reduce-toggle-fullscreen';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
    case EAction.SET_DOM_CONTAINER:
      return reduceSetDomContainer(state, action.payload);
    case EAction.SET_DOM_MARKING:
      return reduceSetDomMarking(state, action.payload);
    case EAction.SET_MARKING_STAGE:
      return reduceSetMarkingStage(state, action.payload);
    case EAction.SET_MARKING_STAGE_STATS:
      return reduceSetMarkingStageStats(state, action.payload);
    case EAction.TOGGLE_LOG_EVENTS:
      return reduceToggleLogEvents(state, action.payload);
    case EAction.TOGGLE_FULLSCREEN:
      return reduceToggleFullscreen(state, action.payload);
    default:
      return state;
  }
}
