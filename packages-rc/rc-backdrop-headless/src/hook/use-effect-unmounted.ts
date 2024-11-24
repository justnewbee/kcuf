import {
  useEffect
} from 'react';

import {
  singletonPull
} from '../util';

import useModelState from './_use-model-state';

export default function useEffectUnmounted(): void {
  const {
    n
  } = useModelState();
  
  useEffect(() => {
    return () => singletonPull(n);
  }, [n]);
}
