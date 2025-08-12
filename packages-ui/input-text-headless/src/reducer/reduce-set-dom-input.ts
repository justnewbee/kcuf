import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetDomInput(state: IModelState, payload: HTMLInputElement | null): IModelState {
  return produce(state, draft => {
    (draft as typeof state).domInput = payload;
  });
}
