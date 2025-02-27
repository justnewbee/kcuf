import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionDebugEvents(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionDebugEvents = payload;
  });
}
