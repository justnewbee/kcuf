import {
  produce
} from 'immer';

import {
  CanvasMarkingClassType
} from '../../../src';
import {
  IModelState
} from '../types';

export default function reduceSetCanvasMarking(state: IModelState, payload: CanvasMarkingClassType | null): IModelState {
  return produce(state, draft => {
    (draft as IModelState).markingInstance = payload;
  });
}
