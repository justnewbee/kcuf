import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetFilterFocused(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.filterFocused = payload;
  });
}
