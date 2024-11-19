import {
  produce
} from 'immer';

import {
  MarkingStageStats
} from '@kcuf/canvas-marking';

import {
  IModelState
} from '../types';

export default function reduceSetMarkingStageStats(state: IModelState, payload: MarkingStageStats | null): IModelState {
  return produce(state, draft => {
    draft.markingInstanceStats = payload;
  });
}
