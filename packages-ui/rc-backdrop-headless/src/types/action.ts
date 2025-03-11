import {
  Dispatch
} from 'react';

import {
  EAction
} from '../enum';

export interface IModelAction {
  type: EAction.REFRESH_VISIBLE;
  payload: number;
}

export type TModelDispatch = Dispatch<IModelAction>;
