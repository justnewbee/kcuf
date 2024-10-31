import {
  produce
} from 'immer';

import {
  EKeyboardCode
} from '../enum';
import {
  IModelState
} from '../types';

export default function reduceSetCodes(state: IModelState, payload: EKeyboardCode[]): IModelState {
  return produce(state, draft => {
    draft.codes = payload;
  });
}
