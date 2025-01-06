import {
  ReactElement,
  useReducer,
  useRef
} from 'react';

import {
  ETransactionStatus
} from '../enum';
import {
  IModelProps,
  IModelProviderProps,
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
  const [state, dispatch] = useReducer<TModelReducer, IModelProps>(reducer, props, createInitialState);
  const nextCallbackRef = useRef<null | (() => void)>(null);
  
  let resolvedChildren: ReactElement | null = null;
  
  if (state.status !== ETransactionStatus.UNMOUNTED) {
    if (typeof children === 'function') {
      resolvedChildren = children(state.status);
    } else {
      resolvedChildren = children;
    }
  }
  
  return <Context.Provider value={{
    nextCallbackRef,
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {resolvedChildren}
  </Context.Provider>;
}
