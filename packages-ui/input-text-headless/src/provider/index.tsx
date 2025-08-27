import {
  ReactElement,
  useRef,
  useReducer
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  IModelProviderProps,
  TChangeReason,
  TModelReducer
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';

export default function Provider({
  children,
  trim = true,
  fluid = true,
  value,
  defaultValue,
  onChange,
  ...props
}: IModelProviderProps): ReactElement {
  const refUnmounted = useRef(false);
  const [controllableValue, controllableOnChange] = useControllableSoftTrim<[TChangeReason]>(trim, value, defaultValue, onChange);
  const [state, dispatch] = useReducer<TModelReducer, string>(reducer, controllableValue, createInitialState);
  
  return <Context.Provider value={{
    refUnmounted,
    props: {
      ...props,
      fluid
    },
    state,
    dispatch,
    controllableValue,
    controllableOnChange
  }}>
    {children}
  </Context.Provider>;
}
