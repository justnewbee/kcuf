import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoDelete(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoDelete = payload;
  });
}
