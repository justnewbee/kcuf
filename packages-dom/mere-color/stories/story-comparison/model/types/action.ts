import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_COLOR_INPUT;
  payload: string;
} | {
  type: EAction.SET_COLOR_ALPHA;
  payload: number;
} | {
  type: EAction.SET_COLOR_NOTATION;
  payload: string;
};

export type TModelDispatch = Dispatch<TModelAction>;
