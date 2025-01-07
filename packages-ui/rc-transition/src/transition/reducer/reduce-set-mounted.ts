import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetMounted(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.mounted = payload;
  });
}
