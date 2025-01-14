import {
  ReactElement,
  useReducer
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  IModelProviderProps,
  TModelReducer
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
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(trim, value, defaultValue, onChange);
  const [state, dispatch] = useReducer<TModelReducer>(reducer, DEFAULT_CONTEXT_STATE);
  
  return <Context.Provider value={{
    props,
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
