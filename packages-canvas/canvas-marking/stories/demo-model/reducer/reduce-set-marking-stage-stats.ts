import {
  produce
} from 'immer';

import {
  MarkingStageStats
} from '../../../src';
import {
  IModelState
} from '../types';

export default function reduceSetMarkingStageStats(state: IModelState, payload: MarkingStageStats | null): IModelState {
  return produce(state, draft => {
    draft.markingStageStats = payload;
  });
}
