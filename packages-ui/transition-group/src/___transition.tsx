import {
  Component,
  Children,
  cloneElement
} from 'react';
import {
  findDOMNode
} from 'react-dom';

import {
  ETransactionStatus
} from './enum';
import {
  ITransitionProps
} from './types';
import {
  forceReflow
} from './util';
import TransitionGroupContext from './transition-group-context';

interface IState {
  status: ETransactionStatus;
}
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use `TransitionCss`
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default, the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example, we can add styles to a component when it enters or exits:
 *
 * ```tsx
 * import {
 *   useRef
 * } from 'react';
 * import {
 *   Transition
 * } from '@kcuf-ui/transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * function Fade({
 *   in: inProp
 * }) {
 *   const nodeRef = useRef(null);
 *
 *   return <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
 *     {state => <div ref={nodeRef} style={{
 *       ...defaultStyle,
 *       ...transitionStyles[state]
 *     }}>
 *       I am a fade Transition!
 *     </div>}
 *   </Transition>;
 * }
 * ```
 *
 * There are 4 main states a Transition can be in:
 *
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example with `useState` hook:
 *
 * ```tsx
 * import {
 *   ReactElement,
 *   useRef,
 *   useState,
 *   useCallback
 * } from 'react';
 * import {
 *   Transition
 * } from '@kcuf-ui/transition-group';
 *
 * function App(): ReactElement {
 *   const refNode = useRef(null);
 *   const [stateIn, setStateIn] = useState(false);
 *   const handleToggleIn = useCallback(() => setStateIn(prevState => !prevState), [setStateIn]);
 *
 *   return <>
 *     <Transition nodeRef={refNode} in={stateIn} timeout={500}>
 *       {state => ...}
 *     </Transition>
 *     <button onClick={handleToggleIn}>Toggle</button>
 *   </>;
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

export default class Transition extends Component<ITransitionProps, IState> {
  constructor(props: ITransitionProps, context) {
    super(props, context);
    
    const parentGroup = context;
    // In the context of a TransitionGroup all enters are really appears
    const appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    
    let initialStatus;
    
    this.appearStatus = null;
    
    if (props.in) {
      if (appear) {
        initialStatus = ETransactionStatus.EXITED;
        this.appearStatus = ETransactionStatus.ENTERING;
      } else {
        initialStatus = ETransactionStatus.ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = ETransactionStatus.UNMOUNTED;
      } else {
        initialStatus = ETransactionStatus.EXITED;
      }
    }
    
    this.state = {
      status: initialStatus
    };
    
    this.nextCallback = null;
  }
  
  static getDerivedStateFromProps({
    in: nextIn
  }: ITransitionProps, prevState: IState): IState | null {
    if (nextIn && prevState.status === ETransactionStatus.UNMOUNTED) {
      return {
        status: ETransactionStatus.EXITED
      };
    }
    
    return null;
  }
  
  componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  }
  
  componentDidUpdate(prevProps: ITransitionProps) {
    let nextStatus = null;
    
    if (prevProps !== this.props) {
      const { status } = this.state;
      
      if (this.props.in) {
        if (status !== ETransactionStatus.ENTERING && status !== ETransactionStatus.ENTERED) {
          nextStatus = ETransactionStatus.ENTERING;
        }
      } else {
        if (status === ETransactionStatus.ENTERING || status === ETransactionStatus.ENTERED) {
          nextStatus = ETransactionStatus.EXITING;
        }
      }
    }
    
    this.updateStatus(false, nextStatus);
  }
  
  componentWillUnmount() {
    this.cancelNextCallback();
  }
  
  getTimeouts() {
    const {
      timeout
    } = this.props;
    let exit, enter, appear;
    
    exit = enter = appear = timeout;
    
    if (timeout !== null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      // TODO: remove fallback for next major
      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }
    
    return {
      exit,
      enter,
      appear
    };
  }
  
  updateStatus(mounting = false, nextStatus) {
    const {
      props: {
        nodeRef,
        unmountOnExit,
        mountOnEnter
      }
    } = this;
    
    if (nextStatus !== null) {
      // nextStatus will always be ETransactionStatus.ENTERING or ETransactionStatus.EXITING.
      this.cancelNextCallback();
      
      if (nextStatus === ETransactionStatus.ENTERING) {
        if (unmountOnExit || mountOnEnter) {
          const node = nodeRef ? nodeRef.current : findDOMNode(this);
          
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen, we have to separate each rendering and avoid being processed as batched.
          if (node) {
            forceReflow(node);
          }
        }
        
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (unmountOnExit && this.state.status === ETransactionStatus.EXITED) {
      this.setState({
        status: ETransactionStatus.UNMOUNTED
      });
    }
  }
  
  performEnter(mounting) {
    const {
      props: {
        nodeRef,
        enter,
        onEntered,
        onEnter,
        onEntering
      }
    } = this;
    const appearing = this.context ? this.context.isMounting : mounting;
    const [maybeNode, maybeAppearing] = nodeRef ? [appearing] : [findDOMNode(this), appearing];
    
    const timeouts = this.getTimeouts();
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    
    // no enter animation skip right to ETransactionStatus.ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({
        status: ETransactionStatus.ENTERED
      }, () => {
        onEntered?.(maybeNode);
      });
      
      return;
    }
    
    onEnter?.(maybeNode, maybeAppearing);
    
    this.safeSetState({
      status: ETransactionStatus.ENTERING
    }, () => {
      onEntering?.(maybeNode, maybeAppearing);
      
      this.onTransitionEnd(enterTimeout, () => {
        this.safeSetState({
          status: ETransactionStatus.ENTERED
        }, () => {
          onEntered?.(maybeNode, maybeAppearing);
        });
      });
    });
  }
  
  performExit() {
    const {
      props: {
        nodeRef,
        exit,
        onExit,
        onExiting,
        onExited
      }
    } = this;
    const timeouts = this.getTimeouts();
    const maybeNode = nodeRef ? undefined : findDOMNode(this);
    
    // no exit animation skip right to ETransactionStatus.EXITED
    if (!exit) {
      this.safeSetState({
        status: ETransactionStatus.EXITED
      }, () => {
        onExited?.(maybeNode);
      });
      
      return;
    }
    
    onExit?.(maybeNode);
    
    this.safeSetState({
      status: ETransactionStatus.EXITING
    }, () => {
      onExiting?.(maybeNode);
      
      this.onTransitionEnd(timeouts.exit, () => {
        this.safeSetState({
          status: ETransactionStatus.EXITED
        }, () => {
          onExited?.(maybeNode);
        });
      });
    });
  }
  
  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }
  
  safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  }
  
  setNextCallback(callback) {
    let active = true;
    
    this.nextCallback = event => {
      if (active) {
        active = false;
        this.nextCallback = null;
        
        callback(event);
      }
    };
    
    this.nextCallback.cancel = () => {
      active = false;
    };
    
    return this.nextCallback;
  }
  
  onTransitionEnd(timeout: number, handler) {
    const {
      props: {
        nodeRef,
        addEndListener,
      }
    } = this;
    this.setNextCallback(handler);
    const node = nodeRef ? nodeRef.current : findDOMNode(this);
    const doesNotHaveTimeoutOrListener = timeout == null && !addEndListener;
    
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      
      return;
    }
    
    if (addEndListener) {
      const [maybeNode, maybeNextCallback] = nodeRef ? [this.nextCallback] : [node, this.nextCallback];
      
      addEndListener(maybeNode, maybeNextCallback);
    }
    
    if (timeout !== null) {
      setTimeout(this.nextCallback, timeout);
    }
  }
  
  render() {
    const status = this.state.status;
    
    if (status === ETransactionStatus.UNMOUNTED) {
      return null;
    }
    
    const {
      children,
      // filter props for `Transition`
      in: _in,
      mountOnEnter: _mountOnEnter,
      unmountOnExit: _unmountOnExit,
      appear: _appear,
      enter: _enter,
      exit: _exit,
      timeout: _timeout,
      addEndListener: _addEndListener,
      onEnter: _onEnter,
      onEntering: _onEntering,
      onEntered: _onEntered,
      onExit: _onExit,
      onExiting: _onExiting,
      onExited: _onExited,
      nodeRef: _nodeRef,
      ...childProps
    } = this.props;
    
    // allows for nested Transitions
    return <TransitionGroupContext.Provider value={null}>
      {typeof children === 'function' ? children(status, childProps) : cloneElement(Children.only(children), childProps)}
    </TransitionGroupContext.Provider>;
  }
}

// Transition.defaultProps = {
//   in: false,
//   mountOnEnter: false,
//   unmountOnExit: false,
//   appear: false,
//   enter: true,
//   exit: true
// };
