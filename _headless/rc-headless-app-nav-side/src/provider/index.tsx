import {
  ReactElement,
  useReducer
} from 'react';

import {
  IModelProviderProps,
  TModelReducer,
  IModelProps
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
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
