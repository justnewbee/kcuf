import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_COLOR;
  payload: string;
} | {
  type: EAction.SET_COLOR_TYPE;
  payload: string;
};

export type TModelDispatch = Dispatch<TModelAction>;
