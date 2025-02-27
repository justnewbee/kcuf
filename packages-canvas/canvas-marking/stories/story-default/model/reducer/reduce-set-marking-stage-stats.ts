import {
  produce
} from 'immer';

import {
  MarkingStats
} from '../../../../src';
import {
  IModelState
} from '../types';

export default function reduceSetCanvasMarkingStats(state: IModelState, payload: MarkingStats | null): IModelState {
  return produce(state, draft => {
    (draft as IModelState).markingStats = payload;
  });
}
