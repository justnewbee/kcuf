import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleOptionDebugEvents(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.optionDebugEvents = !draft.optionDebugEvents;
  });
}
