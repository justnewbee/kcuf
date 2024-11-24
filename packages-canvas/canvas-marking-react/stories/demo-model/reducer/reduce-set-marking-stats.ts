import {
  produce
} from 'immer';

import {
  CanvasMarkingStats
} from '@kcuf/canvas-marking-react-headless';

import {
  IModelState
} from '../types';

export default function reduceSetMarkingStats(state: IModelState, payload: CanvasMarkingStats): IModelState {
  return produce(state, draft => {
    draft.markingStats = payload;
  });
}
