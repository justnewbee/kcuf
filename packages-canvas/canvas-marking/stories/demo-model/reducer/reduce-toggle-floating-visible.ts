import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleFloatingVisible(state: IModelState, payload = !state.floatingVisible): IModelState {
  return produce(state, draft => {
    draft.floatingVisible = payload;
  });
}
