import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceUpdateWindowHeight(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.windowHeight = window.innerHeight;
  });
}
