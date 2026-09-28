import {
  Dispatch
} from 'react';

import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

import {
  EAction
} from '../enum';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TModelAction = {
  type: EAction.SET_MARKING_INSTANCE;
  payload: CanvasMarkingClassType | null;
};

export type TModelDispatch = Dispatch<TModelAction>;
