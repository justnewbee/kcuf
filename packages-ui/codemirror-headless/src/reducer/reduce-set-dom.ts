import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetDom(state: IModelState, payload: HTMLDivElement | null): IModelState {
  return produce(state, draft => {
    (draft as IModelState).dom = payload;
  });
}
