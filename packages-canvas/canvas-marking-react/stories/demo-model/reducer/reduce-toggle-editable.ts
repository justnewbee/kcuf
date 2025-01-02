import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleEditable(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.editable = !draft.editable;
  });
}
