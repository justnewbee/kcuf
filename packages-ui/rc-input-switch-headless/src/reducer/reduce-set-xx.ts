import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetXx(state: IModelState, payload: number): IModelState {
  return produce(state, draft => {
    draft.xx = payload;
  });
}
