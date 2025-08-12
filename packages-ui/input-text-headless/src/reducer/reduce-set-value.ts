import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetValue(state: IModelState, payload: string): IModelState {
  return produce(state, draft => {
    draft.value = payload;
  });
}
