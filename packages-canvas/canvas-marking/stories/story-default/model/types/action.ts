import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';
import {
  CanvasMarkingClassType,
  MarkingStats
} from '../../../../src';

export type TModelAction = {
  type: EAction.SET_EVER_INIT;
} | {
  type: EAction.SET_DOM_CONTAINER | EAction.SET_DOM_MARKING;
  payload: HTMLDivElement | null;
} | {
  type: EAction.SET_MARKING_INSTANCE;
  payload: CanvasMarkingClassType | null;
} | {
  type: EAction.SET_MARKING_STATS;
  payload: MarkingStats | null;
} | {
  type: EAction.SET_OPTION_DEBUG_EVENTS
    | EAction.SET_OPTION_NO_HOVER
    | EAction.SET_OPTION_NO_CLICK
    | EAction.SET_OPTION_NO_SELECT
    | EAction.SET_OPTION_NO_DELETE
    | EAction.SET_OPTION_NO_EDIT_REMOVE_POINT
    | EAction.SET_OPTION_NO_EDIT
    | EAction.SET_OPTION_NO_EDIT_DRAG_POINT
    | EAction.SET_OPTION_NO_EDIT_DRAG_INSERTION
    | EAction.SET_OPTION_NO_EDIT_DRAG_WHOLE
    | EAction.SET_OPTION_NO_CROSSING_DETECTION;
  payload: boolean;
} | {
  type: EAction.TOGGLE_FULLSCREEN;
  payload?: boolean;
};

export type TModelDispatch = Dispatch<TModelAction>;
