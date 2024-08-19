import {
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf/react-hook-is-unmounted';

import {
  TModelAction,
  TModelDispatch
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelDispatch(): TModelDispatch {
  const isUnmounted = useIsUnmounted();
  const {
    dispatch
  } = useModelContext();
  
  return useCallback((action: TModelAction) => { // 不必再担心异步回调 dispatch 可能发生的错误
    if (isUnmounted()) {
      return;
    }
    
    dispatch(action);
  }, [isUnmounted, dispatch]);
}
