import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetHovered(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.hovered = payload;
  });
}
