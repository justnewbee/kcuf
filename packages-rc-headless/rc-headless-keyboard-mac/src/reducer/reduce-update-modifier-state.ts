import {
  produce
} from 'immer';

import {
  IModelState,
  IModifierState
} from '../types';

export default function reduceUpdateModifierState(state: IModelState, payload: IModifierState): IModelState {
  return produce(state, draft => {
    draft.modifierState = {
      ...draft.modifierState,
      ...payload
    };
  });
}
