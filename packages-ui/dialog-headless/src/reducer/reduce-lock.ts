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
 * 锁定 Dialog，使无法关闭
 */
export default function reduceLock(state: IModelState, payload?: boolean): IModelState {
  return produce(state, draft => {
    draft.locked = payload ? EDialogLockState.LOADING : EDialogLockState.YES;
  });
}
