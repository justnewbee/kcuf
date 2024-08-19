import {
  produce
} from 'immer'

import {
  IModelState
} from '../types';

export default function reduceSetFilterVisible(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.filterVisible = payload;
  });
}
