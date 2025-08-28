import {
  ReactElement,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelProviderProps,
  TModelAction,
  TModelReducer
} from '../types';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const isUnmounted = useIsUnmounted();
  const [state, dispatch] = useReducer<TModelReducer>(reducer, {
    domContainer: null,
    markingInstance: null
  });
  
  const safeDispatch = useCallback((action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  }, [isUnmounted, dispatch]);
  
  return <Context.Provider value={{
    props,
    state,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
