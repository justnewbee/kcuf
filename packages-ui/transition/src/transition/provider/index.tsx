import {
  ReactElement,
  Children,
  cloneElement,
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
  ...props
}: IModelProviderProps): ReactElement {
  const isUnmounted = useIsUnmounted();
  const [state, dispatch] = useReducer<TModelReducer, IModelProps>(reducer, props, createInitialState);
  
  let resolvedChildren: ReactElement | null = null;
  
  if (state.mounted) {
    if (typeof children === 'function') {
      resolvedChildren = children(state.status);
    } else {
      resolvedChildren = cloneElement(Children.only(children), {
        'data-transition': state.status
      });
    }
  }
  
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
    {resolvedChildren}
  </Context.Provider>;
}
