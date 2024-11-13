import {
  useEffect
} from 'react';

import {
  singletonUpdate
} from '../util';

import useModelProps from './_use-model-props';
import useDispatchRefreshVisible from './use-dispatch-refresh-visible';
import useModelState from './_use-model-state';
 
export default function useEffectWatchZIndex(): void {
  const {
    zIndex
  } = useModelProps();
  const {
    n
  } = useModelState();
  const dispatchRefreshVisible = useDispatchRefreshVisible();
  
  useEffect(() => {
    singletonUpdate(n, zIndex);
    
    dispatchRefreshVisible();
  }, [zIndex, n, dispatchRefreshVisible]);
}
