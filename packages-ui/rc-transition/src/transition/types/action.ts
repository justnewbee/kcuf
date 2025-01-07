import {
  Dispatch
} from 'react';

import {
  EAction,
  ETransitionStatus
} from '../enum';

export type TModelAction = {
  type: EAction.SET_MOUNTED;
  payload: boolean;
} | {
  type: EAction.SET_STATUS;
  payload: ETransitionStatus;
} | {
  type: EAction.SET_TIMER;
  payload: ReturnType<typeof setTimeout> | null;
};

export type TModelDispatch = Dispatch<TModelAction>;
