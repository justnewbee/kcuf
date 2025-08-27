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
  
  return useCallback((action: TModelAction) => {
    if (refUnmounted.current) {
      return;
    }
    
    dispatch(action);
  }, [refUnmounted, dispatch]);
}
