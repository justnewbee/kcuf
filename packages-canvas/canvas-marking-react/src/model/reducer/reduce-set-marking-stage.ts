import {
  produce
} from 'immer';

import {
  MarkingStageClassType
} from '@kcuf/canvas-marking';

import {
  IModelState
} from '../types';

export default function reduceSetMarkingStage(state: IModelState, payload: MarkingStageClassType | null): IModelState {
  return produce(state, draft => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    draft.markingInstance = payload;
  });
}
