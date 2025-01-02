import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleOptionEditable(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.optionEditable = !draft.optionEditable;
  });
}
