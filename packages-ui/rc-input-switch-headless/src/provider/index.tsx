import {
  ReactElement,
  useReducer
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

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
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: IModelProviderProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable(false, value, defaultValue, onChange);
  const [state, dispatch] = useReducer<TModelReducer, boolean>(reducer, controllableValue, createInitialState);
  
  return <Context.Provider value={{
    props: {
      ...props,
      value: controllableValue,
      onChange: controllableOnChange
    },
    state,
    dispatch
  }}>
    {children}
  </Context.Provider>;
}
