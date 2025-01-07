import {
  ReactElement,
  Children,
  cloneElement,
  useReducer
} from 'react';

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
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {resolvedChildren}
  </Context.Provider>;
}
