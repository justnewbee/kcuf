import {
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelAction,
  TModelDispatch
} from '../types';

import useModelContext from './_use-model-context';

export default function useModelDispatch(): TModelDispatch {
  const isUnmounted = useIsUnmounted();
  const {
    dispatch
  } = useModelContext();
  
  return useCallback((action: IModelAction) => {
    if (isUnmounted()) {
      return;
    }
    
    dispatch(action);
  }, [isUnmounted, dispatch]);
}
