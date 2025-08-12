import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetComposing(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.composing = payload;
  });
}
