import {
  Dispatch,
  SetStateAction,
  useState
} from 'react';

import useIsUnmounted from './use-is-unmounted';

export default function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState);
  const isUnmounted = useIsUnmounted();
  
  const setSafeState = (v: SetStateAction<S>): void => {
    if (!isUnmounted()) {
      setState(v);
    }
  };
  
  return [state, setSafeState];
}
