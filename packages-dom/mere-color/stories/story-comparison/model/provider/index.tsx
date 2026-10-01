import {
  ReactElement,
  PropsWithChildren,
  useReducer
} from 'react';

import {
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
}: PropsWithChildren): ReactElement {
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  return <Context value={{
    state,
    dispatch
  }}>
    {children}
  </Context>;
}
