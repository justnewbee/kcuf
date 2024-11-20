import {
  Dispatch
} from 'react';

import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_DOM_CONTAINER;
  payload: HTMLDivElement | null;
} | {
  type: EAction.SET_MARKING_INSTANCE;
  payload: CanvasMarkingClassType | null;
};

export type TModelDispatch = Dispatch<TModelAction>;
