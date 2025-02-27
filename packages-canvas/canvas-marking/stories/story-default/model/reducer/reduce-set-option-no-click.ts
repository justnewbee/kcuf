import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoClick(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoClick = payload;
  });
}
