import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetVisible(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.visible = payload;
  });
}
