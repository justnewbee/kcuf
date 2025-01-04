import {
  MutableRefObject,
  ReactElement
} from 'react';

export interface ITransitionProps {
  /**
   * A React reference to the DOM element that needs to transition.
   */
  nodeRef?: MutableRefObject<ReactElement>;
  
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
  children: ReactElement;
  
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
   * > only adds an additional enter transition. However, in the
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
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```tsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```tsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout?: number;
  // (props, ...args) => {
  //   let pt = timeoutsShape;
  //   if (!props.addEndListener) pt = pt.isRequired;
  //   return pt(props, ...args);
  // }
  
  // /**
  //  * Add a custom transition end trigger. Called with the transitioning
  //  * DOM node and a `done` callback. Allows for more fine grained transition end
  //  * logic. Timeouts are still used as a fallback if provided.
  //  *
  //  * **Note**: when `nodeRef` prop is passed, `node` is not passed, so `done` is being passed as the first argument.
  //  *
  //  * ```tsx
  //  * addEndListener={(node, done) => {
  //  *   // use the css transitionend event to mark the finish of a transition
  //  *   node.addEventListener('transitionend', done, false);
  //  * }}
  //  * ```
  //  */
  // addEndListener?(): void;
  
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed, so `isAppearing` is being passed as the first argument.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter?(): void;
  
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed, so `isAppearing` is being passed as the first argument.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering?(): void;
  
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed, so `isAppearing` is being passed as the first argument.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered?(): void;
  
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit?(): void;
  
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting?(): void;
  
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited?(): void;
}
