import {
  produce
} from 'immer';

import {
  IKeyDetails,
  IModelState
} from '../types';

export default function reduceSetKeyDetails(state: IModelState, payload: IKeyDetails | null): IModelState {
  return produce(state, draft => {
    draft.keyDetails = payload;
  });
}
