import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetCollapsed(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.collapsed = payload;
  });
}
