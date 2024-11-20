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
  children
}: IModelProviderProps): ReactElement {
  const [state, dispatch] = useReducer<TModelReducer>(reducer, {
    everInit: false,
    domContainer: null,
    domMarking: null,
    markingStageStats: null,
    markingStage: null,
    logEvents: false,
    fullscreen: false
  });
  
  return <Context.Provider value={{
    state,
    dispatch
  }}>
    <Lifecycle />
    {children}
  </Context.Provider>;
}
