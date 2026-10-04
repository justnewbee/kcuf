import {
  ReactElement,
  PropsWithChildren,
  useRef,
  useReducer
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';
import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  TChangeReason,
  IModelPropsWithRef,
  IModelState,
  TModelAction
} from '../types';
import {
  createInitialState
} from '../util';
import reducer from '../reducer';
import Context from '../context';
import Lifecycle from '../lifecycle';

export default function Provider({
  ref,
  children,
  trim = true,
  fluid = true,
  value,
  defaultValue,
  onChange,
  ...props
}: PropsWithChildren<IModelPropsWithRef>): ReactElement {
  const domInputRef = useRef<HTMLInputElement>(null);
  const isUnmounted = useIsUnmounted();
  const [controllableValue, controllableOnChange] = useControllableSoftTrim<[TChangeReason]>(trim, value, defaultValue, onChange);
  const [state, dispatch] = useReducer<IModelState, string, [TModelAction]>(reducer, controllableValue, createInitialState);
  
  const safeDispatch = (action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  };
  
  return <Context value={{
    ref,
    domInputRef,
    props: {
      ...props,
      fluid
    },
    state,
    dispatch: safeDispatch,
    controllableValue,
    controllableOnChange
  }}>
    <Lifecycle />
    {children}
  </Context>;
}
