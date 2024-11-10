import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

/**
 * 更新 data
 */
export default function reduceUpdateData(state: IModelState, payload: Record<string, unknown>): IModelState {
  return produce(state, draft =>  {
    draft.data = payload;
  });
}
