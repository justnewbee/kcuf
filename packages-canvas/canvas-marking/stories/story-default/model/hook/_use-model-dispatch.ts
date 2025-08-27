import {
  useCallback
} from 'react';

import {
  TModelAction,
  TModelDispatch
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelDispatch(): TModelDispatch {
  const {
    refUnmounted,
    dispatch
  } = useModelContext();
  
  return useCallback((action: TModelAction) => { // 不必再担心异步回调 dispatch 可能发生的错误
    if (refUnmounted.current) {
      return;
    }
    
    dispatch(action);
  }, [refUnmounted, dispatch]);
}
