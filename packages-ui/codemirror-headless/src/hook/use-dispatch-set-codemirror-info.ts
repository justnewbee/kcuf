import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';
import {
  ICodemirrorInfo
} from '../types';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetCodemirrorInfo(): (payload: ICodemirrorInfo) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: ICodemirrorInfo) => dispatch({
    type: EAction.SET_CODEMIRROR_INFO,
    payload
  }), [dispatch]);
}
