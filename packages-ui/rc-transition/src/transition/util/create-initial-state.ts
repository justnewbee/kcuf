import {
  ETransitionStatus
} from '../enum';
import {
  IModelProps,
  IModelState
} from '../types';

export default function createInitialState(props: IModelProps): IModelState {
  return {
    mounted: !props.mountOnEnter,
    status: ETransitionStatus.EXITED,
    timer: null
  };
}
