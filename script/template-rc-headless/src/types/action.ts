import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_XX;
  payload: number;
} | {
  type: EAction.SET_YY;
  payload: string;
};

export type TModelDispatch = Dispatch<TModelAction>;
