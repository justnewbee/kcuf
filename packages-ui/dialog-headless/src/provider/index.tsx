import {
  PropsWithChildren,
  ReactElement,
  useReducer
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelPropsDialog,
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
  children,
  ...props
}: PropsWithChildren<IModelPropsDialog>): ReactElement {
  const isUnmounted = useIsUnmounted();
  const [state, dispatch] = useReducer<IModelState, IModelPropsDialog, [TModelAction]>(reducer, props, createInitialState);
  
  const safeDispatch = (action: TModelAction): void => {
    if (!isUnmounted()) {
      dispatch(action);
    }
  };
  
  return <Context value={{
    props,
    state,
    dispatch: safeDispatch
  }}>
    <Lifecycle />
    {children}
  </Context>;
}
