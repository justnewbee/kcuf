import {
  produce
} from 'immer';

import {
  IModelState,
  IKeyboardModifiers
} from '../types';

export default function reduceUpdateActiveModifiers(state: IModelState, payload: IKeyboardModifiers): IModelState {
  return produce(state, draft => {
    draft.activeModifiers = {
      ...draft.activeModifiers,
      ...payload
    };
  });
}
