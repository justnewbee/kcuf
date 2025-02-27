import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoEditDragWhole(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoEditDragWhole = payload;
  });
}
