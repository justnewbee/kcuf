import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

/**
 * 强制更新以重新 render
 */
export default function reduceForceUpdate(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.countForcedUpdate = state.countForcedUpdate + 1;
  });
}
