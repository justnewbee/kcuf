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
  type: EAction.LOOP_OPTION_EDITABLE | EAction.TOGGLE_OPTION_DEBUG_EVENTS;
} | {
  type: EAction.TOGGLE_FULLSCREEN;
  payload?: boolean;
};

export type TModelDispatch = Dispatch<TModelAction>;
