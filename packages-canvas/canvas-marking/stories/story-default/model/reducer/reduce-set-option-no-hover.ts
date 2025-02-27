import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoHover(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoHover = payload;
  });
}
