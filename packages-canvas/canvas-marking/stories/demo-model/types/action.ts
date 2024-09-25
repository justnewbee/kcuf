import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';
import {
  MarkingStageClassType,
  MarkingStageStats
} from '../../../src';

export type TModelAction = {
  type: EAction.SET_DOM_CONTAINER | EAction.SET_DOM_MARKING;
  payload: HTMLDivElement | null;
} | {
  type: EAction.SET_MARKING_STAGE;
  payload: MarkingStageClassType | null;
} | {
  type: EAction.SET_MARKING_STAGE_STATS;
  payload: MarkingStageStats | null;
} | {
  type: EAction.TOGGLE_LOG_EVENTS | EAction.TOGGLE_FULLSCREEN;
  payload?: boolean;
};

export type TModelDispatch = Dispatch<TModelAction>;
