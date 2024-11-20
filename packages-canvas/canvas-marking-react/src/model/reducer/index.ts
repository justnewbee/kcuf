import {
  IModelState,
  TModelAction
} from '../types';
import {
  EAction
} from '../enum';

import reduceSetDomContainer from './reduce-set-dom-container';
import reduceSetMarkingStage from './reduce-set-marking-stage';

export default function reducer(state: IModelState, action: TModelAction): IModelState {
  switch (action.type) {
  case EAction.SET_DOM_CONTAINER:
    return reduceSetDomContainer(state, action.payload);
  case EAction.SET_MARKING_INSTANCE:
    return reduceSetMarkingStage(state, action.payload);
  default:
    return state;
  }
}
