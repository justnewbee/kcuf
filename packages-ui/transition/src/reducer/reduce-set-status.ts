import {
  produce
} from 'immer';

import {
  ETransitionStatus
} from '../enum';
import {
  IModelState
} from '../types';

export default function reduceSetStatus(state: IModelState, payload: ETransitionStatus): IModelState {
  return produce(state, draft => {
    draft.status = payload;
  });
}
