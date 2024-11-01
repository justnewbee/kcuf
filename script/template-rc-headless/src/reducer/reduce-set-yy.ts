import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetYy(state: IModelState, payload: string): IModelState {
  return produce(state, draft => {
    draft.yy = payload;
  });
}
