import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';
import {
  EDataType
} from '../enum';
import {
  getDataImage,
  getDataMarkings
} from '../util';

export default function reduceSetDataType(state: IModelState, payload: EDataType): IModelState {
  return produce(state, draft => {
    draft.dataType = payload;
    draft.image = getDataImage(payload);
    draft.markings = getDataMarkings(payload);
  });
}
