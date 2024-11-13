import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

/**
 * 修改 zIndex
 */
 
export default function reduceSetZIndex(state: IModelState, payload: number): IModelState {
  return produce(state, draft => {
    draft.zIndex = payload;
  });
}
