import {
  produce
} from 'immer';

import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

import {
  IModelState
} from '../types';

export default function reduceSetCanvasMarking(state: IModelState, payload: CanvasMarkingClassType | null): IModelState {
  return produce(state, draft => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    draft.markingInstance = payload;
  });
}
