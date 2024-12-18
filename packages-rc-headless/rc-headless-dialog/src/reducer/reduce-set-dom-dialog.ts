import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetDomDialog(state: IModelState, payload: HTMLDivElement | null): IModelState {
  return produce(state, draft => {
    // @ts-ignore
    draft.domDialog = payload;
  });
}
