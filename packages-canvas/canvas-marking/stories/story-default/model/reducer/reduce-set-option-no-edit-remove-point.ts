import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoEditRemovePoint(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoEditRemovePoint = payload;
  });
}
