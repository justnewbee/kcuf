import {
  ReactElement,
  useReducer
} from 'react';

import {
  IModelProviderProps,
  IModelReducer
} from '../types';
import {
  DEFAULT_CONTEXT_STATE
} from '../const';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  trim,
  value,
  defaultValue,
  onChange,
  ...props
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<IModelReducer>(reducer, DEFAULT_CONTEXT_STATE);
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    {children}
    <Lifecycle />
  </Context.Provider>;
}
