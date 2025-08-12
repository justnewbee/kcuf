import {
  ReactElement,
  useReducer
} from 'react';

import {
  TModelReducer,
  IModelProviderProps
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
  const [state, dispatch] = useReducer<TModelReducer>(reducer, getDefaultContextState(props.data));
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
