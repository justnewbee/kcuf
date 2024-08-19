import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

/**
 * 修改 zIndex
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function reduceSetZIndex(state: IModelState, payload: number): IModelState {
  return produce(state, draft => {
    draft.zIndex = payload;
  });
}
