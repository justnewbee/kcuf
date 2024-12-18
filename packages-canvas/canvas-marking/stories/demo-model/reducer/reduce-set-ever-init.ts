import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetEverInit(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.everInit = true;
  });
}
