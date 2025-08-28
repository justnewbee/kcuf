import {
  ReactElement,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelProps,
  IModelProviderProps,
  TModelAction,
  TModelReducer
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  listen = true,
  detailsInSpace = true,
  ...restProps
}: IModelProviderProps): ReactElement {
  const isUnmounted = useIsUnmounted();
  const props = {
    listen,
    detailsInSpace,
    ...restProps
  };
  const [state, dispatch] = useReducer<TModelReducer, IModelProps>(reducer, props, createInitialState);
  
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
