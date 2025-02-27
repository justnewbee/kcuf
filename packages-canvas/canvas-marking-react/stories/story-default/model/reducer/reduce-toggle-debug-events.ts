import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleDebugEvents(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.debugEvents = !draft.debugEvents;
  });
}
