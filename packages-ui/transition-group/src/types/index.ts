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
   * > `<CSSTransition>` component that first enter transition does result in
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

export interface ICssTransitionProps extends ITransitionProps {
  /**
   * The animation classNames applied to the component as it appears, enters,
   * exits or has finished the transition. A single name can be provided, which
   * will be suffixed for each stage, e.g. `classNames="fade"` applies:
   *
   * - `fade-appear`, `fade-appear-active`, `fade-appear-done`
   * - `fade-enter`, `fade-enter-active`, `fade-enter-done`
   * - `fade-exit`, `fade-exit-active`, `fade-exit-done`
   *
   * A few details to note about how these classes are applied:
   *
   * 1. They are _joined_ with the ones that are already defined on the child
   *    component, so if you want to add some base styles, you can use
   *    `className` without worrying that it will be overridden.
   *
   * 2. If the transition component mounts with `in={false}`, no classes are
   *    applied yet. You might be expecting `*-exit-done`, but if you think
   *    about it, a component cannot finish exiting if it hasn't entered yet.
   *
   * 2. `fade-appear-done` and `fade-enter-done` will _both_ be applied. This
   *    allows you to define different behavior for when appearing is done and
   *    when regular entering is done, using selectors like
   *    `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply
   *    an epic entrance animation when element first appears in the DOM using
   *    [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
   *    simply use `fade-enter-done` for defining both cases.
   *
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  appearDone: 'my-done-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  enterDone: 'my-done-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   *  exitDone: 'my-done-exit',
   * }}
   * ```
   *
   * If you want to set these classes using CSS Modules:
   *
   * ```js
   * import styles from './styles.css';
   * ```
   *
   * you might want to use camelCase in your CSS file, that way could simply
   * spread them instead of listing them one by one:
   *
   * ```js
   * classNames={{ ...styles }}
   * ```
   */
  classNames?: string | {
    appear?: string;
    appearActive?: string;
    appearDone?: string;
    enter?: string;
    enterActive?: string;
    enterDone?: string;
    exit?: string;
    exitActive?: string;
    exitDone?: string;
  };
}

export interface ITransitionGroupProps {
  /** 
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: string | null;
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children?: ReactElement;
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear?: boolean;
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter?: boolean;
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit?: boolean;

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory?(child: ReactElement): ReactElement;
}
