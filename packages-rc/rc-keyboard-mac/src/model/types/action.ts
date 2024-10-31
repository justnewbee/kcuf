import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

import {
  IKeyDetails
} from './common';

export type TModelAction = {
  type: EAction.SET_CAPS_LOCK;
  payload: boolean;
} | {
  type: EAction.SET_CODES;
  payload: string[];
} | {
  type: EAction.SET_KEY_DETAILS;
  payload: IKeyDetails | null;
};

export type TModelDispatch = Dispatch<TModelAction>;
