import {
  produce
} from 'immer';

import {
  Editable
} from '../../../../src';
import {
  IModelState
} from '../types';

function getNextEditable(value: Editable): Editable {
  switch (value) {
  case 'locked':
    return true;
  case true:
    return false;
  default:
    return 'locked';
  }
}

export default function reduceLoopOptionEditable(state: IModelState): IModelState {
  return produce(state, draft => {
    draft.optionEditable = getNextEditable(draft.optionEditable);
  });
}
