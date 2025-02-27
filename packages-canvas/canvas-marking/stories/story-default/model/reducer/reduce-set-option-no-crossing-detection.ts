import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceSetOptionNoCrossingDetection(state: IModelState, payload: boolean): IModelState {
  return produce(state, draft => {
    draft.optionNoCrossingDetection = payload;
  });
}
