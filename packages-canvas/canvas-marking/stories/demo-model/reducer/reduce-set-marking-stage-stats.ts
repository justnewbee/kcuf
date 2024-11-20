import {
  produce
} from 'immer';

import {
  CanvasMarkingStats
} from '../../../src';
import {
  IModelState
} from '../types';

export default function reduceSetCanvasMarkingStats(state: IModelState, payload: CanvasMarkingStats | null): IModelState {
  return produce(state, draft => {
    draft.markingStats = payload;
  });
}
