import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetCodes(state: IModelState, payload: string[]): IModelState {
  return produce(state, draft => {
    draft.codes = payload;
  });
}
