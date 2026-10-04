import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_VALUE;
  payload: string;
} | {
  type: EAction.SET_COMPOSING;
  payload: boolean;
};

export type TModelDispatch = Dispatch<TModelAction>;
