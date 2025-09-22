import {
  produce
} from 'immer';

import {
  ICodemirrorInfo,
  IModelState
} from '../types';

export default function reduceInit(state: IModelState, payload: ICodemirrorInfo): IModelState {
  return produce(state, draft => {
    (draft as IModelState).codemirror = payload;
  });
}
