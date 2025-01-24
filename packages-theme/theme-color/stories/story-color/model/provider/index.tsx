import {
  ReactElement,
  useReducer
} from 'react';

import {
  IModelProviderProps,
  TModelReducer
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';

export default function Provider({
  children
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<TModelReducer, null>(reducer, null, createInitialState);
  
  return <Context.Provider value={{
    state,
    dispatch
  }}>
    {children}
  </Context.Provider>;
}
