import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoEditDragInsertion(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoEditDragInsertion = payload;
  });
}
