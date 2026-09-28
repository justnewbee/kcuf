import {
  produce
} from 'immer';

import {
  MarkingStats
} from '../../../../src';
import {
  IModelState
} from '../types';

export default function reduceSetMarkingStats(state: IModelState, payload: MarkingStats): IModelState {
  return produce(state, draft => {
    draft.markingStats = payload;
  });
}
