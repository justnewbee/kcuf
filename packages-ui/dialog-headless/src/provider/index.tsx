import {
  ReactElement, useCallback,
  useReducer
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelProviderProps,
  TModelAction,
  TModelReducer
} from '../types';
import {
  getDefaultContextState
} from '../util';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  props,
  children
}: IModelProviderProps): ReactElement {
  const isUnmounted = useIsUnmounted();
  const [state, dispatch] = useReducer<TModelReducer>(reducer, getDefaultContextState(props.data));
  
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
