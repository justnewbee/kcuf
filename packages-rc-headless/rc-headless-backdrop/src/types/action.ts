import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export interface TModelAction {
  type: EAction.REFRESH_VISIBLE;
}

export type TModelDispatch = Dispatch<TModelAction>;
