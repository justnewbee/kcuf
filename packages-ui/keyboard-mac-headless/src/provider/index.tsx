import {
  ReactElement,
  PropsWithChildren,
  useReducer
} from 'react';

import useIsUnmounted from '@kcuf-hook/use-is-unmounted';

import {
  IModelProps,
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
  listen = true,
  detailsInSpace = true,
  ...restProps
}: PropsWithChildren<IModelProps>): ReactElement {
  const isUnmounted = useIsUnmounted();
  const props = {
    listen,
    detailsInSpace,
    ...restProps
  };
  const [state, dispatch] = useReducer<IModelState, null, [TModelAction]>(reducer, null, createInitialState);
  
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
