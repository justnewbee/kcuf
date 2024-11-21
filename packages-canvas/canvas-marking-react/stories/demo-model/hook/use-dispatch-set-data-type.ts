import {
  useCallback
} from 'react';

import {
  EAction,
  EDataType
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetDataType(): (payload: EDataType) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: EDataType) => dispatch({
    type: EAction.SET_DATA_TYPE,
    payload
  }), [dispatch]);
}
