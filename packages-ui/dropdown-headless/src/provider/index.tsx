import {
  ReactElement,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelProviderProps,
  IModelProps,
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
  const [state, dispatch] = useReducer<IModelState, IModelProps, [TModelAction]>(reducer, props, createInitialState);
  
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
