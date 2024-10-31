import {
  produce
} from 'immer';

import {
  EKeyboardCode
} from '../enum';
import {
  IModelState
} from '../types';

export default function reducePushActiveCode(state: IModelState, payload: EKeyboardCode): IModelState {
  return state.activeCodes.includes(payload) ? state : produce(state, draft => {
    draft.activeCodes.push(payload);
  });
}
