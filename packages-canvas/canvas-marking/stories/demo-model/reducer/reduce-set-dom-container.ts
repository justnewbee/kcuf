import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetDomContainer(state: IModelState, payload: HTMLDivElement | null): IModelState {
  return produce(state, draft => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    draft.domContainer = payload;
  });
}
