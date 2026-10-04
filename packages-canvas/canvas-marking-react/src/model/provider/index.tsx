import {
  ReactElement,
  PropsWithChildren,
  useRef,
  useReducer
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
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
  ...props
}: PropsWithChildren<IModelPropsWithRef>): ReactElement {
  const domRef = useRef<HTMLDivElement>(null);
  const isUnmounted = useIsUnmounted();
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
  const safeDispatch = (action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  };
  
  return <Context value={{
    ref,
    domRef,
    props,
    state,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </Context>;
}
