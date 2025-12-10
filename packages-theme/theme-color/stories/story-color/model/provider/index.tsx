import {
  ReactElement,
  useReducer
} from 'react';

import {
  IModelProviderProps,
  IModelState,
  TModelAction
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';

export default function Provider({
  children
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  return <Context value={{
    state,
    dispatch
  }}>
    {children}
  </Context>;
}
