import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetColor from './reduce-set-color';
import reduceSetColorType from './reduce-set-color-type';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_COLOR:
    return reduceSetColor(state, action.payload);
  case EAction.SET_COLOR_TYPE:
    return reduceSetColorType(state, action.payload);
  default:
    return state;
  }
}
