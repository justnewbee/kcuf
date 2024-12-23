import {
  ReactElement,
  useReducer
} from 'react';

import {
  TModelReducer,
  IModelProviderProps
} from '../types';
import {
  DEFAULT_CONTEXT_STATE
} from '../const';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<TModelReducer>(reducer, DEFAULT_CONTEXT_STATE);
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
