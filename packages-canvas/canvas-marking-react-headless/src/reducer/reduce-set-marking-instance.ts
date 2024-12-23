import {
  produce
} from 'immer';

import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

import {
  IModelState
} from '../types';

export default function reduceSetMarkingInstance(state: IModelState, payload: CanvasMarkingClassType | null): IModelState {
  return produce(state, draft => {
    (draft as IModelState).markingInstance = payload;
  });
}
