import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';
import {
  CanvasMarkingClassType,
  CanvasMarkingStats
} from '../../../src';

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
  payload: CanvasMarkingStats | null;
} | {
  type: EAction.TOGGLE_LOG_EVENTS | EAction.TOGGLE_FULLSCREEN;
  payload?: boolean;
};

export type TModelDispatch = Dispatch<TModelAction>;
