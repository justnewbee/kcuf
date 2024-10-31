import {
  ReactElement,
  useReducer
} from 'react';

import {
  IModelProps,
  IModelProviderProps,
  IModelReducer
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  children,
  listen = true,
  detailsInSpace = true,
  ...restProps
}: IModelProviderProps): ReactElement {
  const props = {
    listen,
    detailsInSpace,
    ...restProps
  };
  const [state, dispatch] = useReducer<IModelReducer, IModelProps>(reducer, props, createInitialState);
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    {children}
    <Lifecycle />
  </Context.Provider>;
}
