import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleDestroyed(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.destroyed = !draft.destroyed;
  });
}
