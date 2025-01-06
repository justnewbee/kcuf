import {
  produce
} from 'immer';

import {
  ETransactionStatus
} from '../enum';
import {
  IModelState
} from '../types';

export default function reduceSetStatus(state: IModelState, payload: ETransactionStatus): IModelState {
  return produce(state, draft => {
    draft.status = payload;
  });
}
