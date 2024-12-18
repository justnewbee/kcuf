import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';
import {
  singletonIsVisible
} from '../util';

export default function reduceRefreshVisible(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.visible = singletonIsVisible(draft.n);
  });
}
