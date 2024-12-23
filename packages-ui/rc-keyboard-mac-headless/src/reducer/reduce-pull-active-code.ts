import {
  produce
} from 'immer';

import {
  EKeyboardCode
} from '../enum';
import {
  IModelState
} from '../types';

export default function reducePullActiveCode(state: IModelState, payload: EKeyboardCode): IModelState {
  const index = state.activeCodes.indexOf(payload);
  
  return index < 0 ? state : produce(state, draft => {
    draft.activeCodes.splice(index, 1);
  });
}
