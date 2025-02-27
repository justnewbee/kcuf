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
import reduceSetCanvasMarking from './reduce-set-marking-stage';
import reduceSetCanvasMarkingStats from './reduce-set-marking-stage-stats';
import reduceSetOptionDebugEvents from './reduce-set-option-debug-events';
import reduceSetOptionNoClick from './reduce-set-option-no-click';
import reduceSetOptionNoHover from './reduce-set-option-no-hover';
import reduceSetOptionNoSelect from './reduce-set-option-no-select';
import reduceSetOptionNoEdit from './reduce-set-option-no-edit';
import reduceSetOptionNoEditDragPoint from './reduce-set-option-no-edit-drag-point';
import reduceSetOptionNoEditDragInsertion from './reduce-set-option-no-edit-drag-insertion';
import reduceSetOptionNoEditDragWhole from './reduce-set-option-no-edit-drag-whole';
import reduceSetOptionNoEditRemovePoint from './reduce-set-option-no-edit-remove-point';
import reduceSetOptionNoDelete from './reduce-set-option-no-delete';
import reduceSetOptionNoCrossingDetection from './reduce-set-option-no-crossing-detection';
import reduceToggleFullscreen from './reduce-toggle-fullscreen';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DOM_CONTAINER:
    return reduceSetDomContainer(state, action.payload);
  case EAction.SET_DOM_MARKING:
    return reduceSetDomMarking(state, action.payload);
  case EAction.SET_EVER_INIT:
    return reduceSetEverInit(state);
  case EAction.SET_MARKING_INSTANCE:
    return reduceSetCanvasMarking(state, action.payload);
  case EAction.SET_MARKING_STATS:
    return reduceSetCanvasMarkingStats(state, action.payload);
  case EAction.SET_OPTION_DEBUG_EVENTS:
    return reduceSetOptionDebugEvents(state, action.payload);
  case EAction.SET_OPTION_NO_CLICK:
    return reduceSetOptionNoClick(state, action.payload);
  case EAction.SET_OPTION_NO_HOVER:
    return reduceSetOptionNoHover(state, action.payload);
  case EAction.SET_OPTION_NO_SELECT:
    return reduceSetOptionNoSelect(state, action.payload);
  case EAction.SET_OPTION_NO_EDIT:
    return reduceSetOptionNoEdit(state, action.payload);
  case EAction.SET_OPTION_NO_EDIT_REMOVE_POINT:
    return reduceSetOptionNoEditRemovePoint(state, action.payload);
  case EAction.SET_OPTION_NO_EDIT_DRAG_INSERTION:
    return reduceSetOptionNoEditDragInsertion(state, action.payload);
  case EAction.SET_OPTION_NO_EDIT_DRAG_POINT:
    return reduceSetOptionNoEditDragPoint(state, action.payload);
  case EAction.SET_OPTION_NO_EDIT_DRAG_WHOLE:
    return reduceSetOptionNoEditDragWhole(state, action.payload);
  case EAction.TOGGLE_FULLSCREEN:
    return reduceToggleFullscreen(state, action.payload);
  case EAction.SET_OPTION_NO_DELETE:
    return reduceSetOptionNoDelete(state, action.payload);
  case EAction.SET_OPTION_NO_CROSSING_DETECTION:
    return reduceSetOptionNoCrossingDetection(state, action.payload);
  default:
    return state;
  }
}
