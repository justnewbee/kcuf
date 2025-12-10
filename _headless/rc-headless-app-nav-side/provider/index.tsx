import {
  ReactElement,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelProviderProps,
  IModelState,
  TModelAction
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const isUnmounted = useIsUnmounted();
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  const safeDispatch = useCallback((action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  }, [isUnmounted, dispatch]);
  
  return <Context value={{
    props,
    state,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </Context>;
}
