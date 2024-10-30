import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetCapsLock(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.capsLock = payload;
  });
}
