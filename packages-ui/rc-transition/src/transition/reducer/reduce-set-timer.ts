import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetTimer(state: IModelState, payload: ReturnType<typeof setTimeout> | null): IModelState {
  return produce(state, draft => {
    draft.timer = payload;
  });
}
