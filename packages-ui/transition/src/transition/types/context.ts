import {
  ReactElement
} from 'react';

import {
  TRenderChildren
} from './common';
import {
  IModelProps
} from './props';
import {
  IModelState
} from './state';
import {
  TModelAction,
  TModelDispatch
} from './action';

export type TModelReducer = (state: IModelState, action: TModelAction) => IModelState;

export interface IModelContext {
  props: IModelProps;
  state: IModelState;
  dispatch: TModelDispatch;
}

export interface IModelProviderProps extends IModelProps {
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```tsx
   * <Transition nodeRef={nodeRef} in={this.state.in} timeout={150}>
   *   {state => <MyComponent ref={nodeRef} className={`fade fade-${state}`} />}
   * </Transition>
   * ```
   */
  children: ReactElement | TRenderChildren;
}
