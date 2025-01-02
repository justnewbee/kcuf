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
import Lifecycle from '../lifecycle';

const INITIAL_STATE = createInitialState();

export default function Provider({
  children
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<TModelReducer>(reducer, INITIAL_STATE);
  
  return <Context.Provider value={{
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
