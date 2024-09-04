import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleLogEvents(state: IModelState, payload = !state.floatingVisible): IModelState {
  return produce(state, draft => {
    draft.logEvents = payload;
  });
}
