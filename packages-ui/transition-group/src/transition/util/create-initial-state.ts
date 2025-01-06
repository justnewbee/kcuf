import {
  IModelProps,
  IModelState
} from '../types';

import getInitialStatus from './get-initial-status';

export default function createInitialState(props: IModelProps): IModelState {
  return {
    status: getInitialStatus(props)
  };
}
