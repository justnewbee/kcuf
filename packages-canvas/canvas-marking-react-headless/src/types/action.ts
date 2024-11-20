import {
  Dispatch
} from 'react';

import {
  MarkingStageClassType
} from '@kcuf/canvas-marking';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_DOM_CONTAINER;
  payload: HTMLDivElement | null;
} | {
  type: EAction.SET_MARKING_INSTANCE;
  payload: MarkingStageClassType | null;
};

export type TModelDispatch = Dispatch<TModelAction>;
