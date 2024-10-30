import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export type TModelAction = {
  type: EAction.SET_CAPS_LOCK;
  payload: boolean;
} | {
  type: EAction.SET_CODES;
  payload: string[];
};

export type TModelDispatch = Dispatch<TModelAction>;
