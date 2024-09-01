import {
  produce
} from 'immer';

import {
  MarkingStageStats
} from '../../../src';
import {
  IModelState
} from '../types';

export default function reduceSetMarkingStage(state: IModelState, payload: MarkingStageStats | null): IModelState {
  return produce(state, draft => {
    draft.markingStageStats = payload;
  });
}
