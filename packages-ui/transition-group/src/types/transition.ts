import {
  MutableRefObject,
  ReactElement
} from 'react';

import {
  ITransitionDurations,
  TRenderChildren
} from './common';

export interface ITransitionProps {
  /**
   * A React reference to the DOM element that needs to transition.
   */
  nodeRef: MutableRefObject<HTMLElement | null>;
  
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
  
  /**
   * Show the component; triggers the enter or exit states
   */
  in?: boolean;
  
  /**
   * By default, the child component is mounted immediately along with the parent `Transition` component.
   * If you want to 'lazy mount' the component on the first `in={true}` you can set `mountOnEnter`.
   * After the first enter transition the component will stay mounted, even on 'exited', unless you also specify `unmountOnExit`.
   */
  mountOnEnter?: boolean;
  
  /**
   * By default, the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
  
  /**
   * By default, the child component does not perform the enter transition when it first mounts,
   * regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds additional enter transition. However, in the
   * > `<TransitionCss>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear?: boolean;
  
  /**
   * Enable or disable enter transitions.
   */
  enter?: boolean;
  
  /**
   * Enable or disable exit transitions.
   */
  exit?: boolean;
  
  /**
   * The duration of the transition, in milliseconds.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```tsx
   * duration: 500
   * ```
   *
   * or individually:
   *
   * ```tsx
   * duration: {
   *  appear: 500,
   *  enter: 300,
   *  exit: 500
   * }
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   */
  duration?: number | ITransitionDurations;
  
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `appearing` is supplied to indicate if the enter stage is occurring on the initial mount
   */
  onEnter?(appearing: boolean): void;
  
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `appearing` is supplied to indicate if the enter stage is occurring on the initial mount
   */
  onEntering?(appearing: boolean): void;
  
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `appearing` is supplied to indicate if the enter stage is occurring on the initial mount
   */
  onEntered?(appearing: boolean): void;
  
  /**
   * Callback fired before the "exiting" status is applied.
   */
  onExit?(): void;
  
  /**
   * Callback fired after the "exiting" status is applied.
   */
  onExiting?(): void;
  
  /**
   * Callback fired after the "exited" status is applied.
   */
  onExited?(): void;
}
