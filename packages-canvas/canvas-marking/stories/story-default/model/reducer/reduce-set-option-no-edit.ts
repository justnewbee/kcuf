import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoEdit(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoEdit = payload;
  });
}
