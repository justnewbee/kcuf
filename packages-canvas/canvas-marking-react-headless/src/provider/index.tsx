import {
  ReactElement,
  useReducer
} from 'react';

import {
  IModelProviderProps,
  TModelReducer
} from '../types';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<TModelReducer>(reducer, {
    domContainer: null,
    markingInstance: null
  });
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
