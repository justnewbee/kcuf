import {
  produce
} from 'immer';

import {
  EDialogLockState
} from '../enum';
import {
  IModelState
} from '../types';

/**
 * 解除锁定
 */
export default function reduceUnlock(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.locked = EDialogLockState.NO;
  });
}
