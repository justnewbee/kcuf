import {
  ReactElement,
  useReducer,
  useCallback
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';
import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  TChangeReason,
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
  children,
  trim = true,
  fluid = true,
  value,
  defaultValue,
  onChange,
  ...props
}: IModelProviderProps): ReactElement {
  const isUnmounted = useIsUnmounted();
  const [controllableValue, controllableOnChange] = useControllableSoftTrim<[TChangeReason]>(trim, value, defaultValue, onChange);
  const [state, dispatch] = useReducer<IModelState, string, [TModelAction]>(reducer, controllableValue, createInitialState);
  
  const safeDispatch = useCallback((action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  }, [isUnmounted, dispatch]);
  
  return <Context value={{
    props: {
      ...props,
      fluid
    },
    state,
    dispatch: safeDispatch,
    controllableValue,
    controllableOnChange
  }}>
    {children}
  </Context>;
}
