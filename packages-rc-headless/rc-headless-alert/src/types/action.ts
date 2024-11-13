import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export interface TModelAction {
  type: EAction.SET_VISIBLE;
  payload: boolean;
}

export type TModelDispatch = Dispatch<TModelAction>;
