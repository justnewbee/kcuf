import {
  Dispatch
} from 'react';

import {
  EAction,
  ETransactionStatus
} from '../enum';

export type TModelAction = {
  type: EAction.SET_STATUS;
  payload: ETransactionStatus;
};

export type TModelDispatch = Dispatch<TModelAction>;
