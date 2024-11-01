import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetXx from './reduce-set-xx';
import reduceSetYy from './reduce-set-yy';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
    case EAction.SET_XX:
      return reduceSetXx(state, action.payload);
    case EAction.SET_YY:
      return reduceSetYy(state, action.payload);
    default:
      return state;
  }
}
