import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleDisabled(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.disabled = !draft.disabled;
  });
}
