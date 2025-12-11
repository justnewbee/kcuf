import {
  produce
} from 'immer';

import {
  ICodemirrorInfo,
  IModelState
} from '../types';

export default function reduceSetCodemirrorInfo(state: IModelState, payload: ICodemirrorInfo): IModelState {
  return produce(state, draft => {
    (draft as IModelState).codemirrorInfo = payload;
  });
}
