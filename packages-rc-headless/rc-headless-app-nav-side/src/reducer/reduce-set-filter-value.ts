import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetFilterValue(state: IModelState, payload: string): IModelState {
  return produce(state, draft => {
    draft.filterValue = payload;
  });
}
