import {
  ETransitionStatus
} from '../enum';

import useModelState from './_use-model-state';

export default function useTransitionStatus(): `${ETransitionStatus}` {
  return useModelState().status;
}
