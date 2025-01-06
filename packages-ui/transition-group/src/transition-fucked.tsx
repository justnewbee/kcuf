import {
  ReactElement,
  Children,
  cloneElement,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';

import {
  ETransactionStatus
} from './enum';
import {
  ITransitionDurations,
  ITransitionProps
} from './types';
import {
  forceReflow
} from './util';

import ModelTransition from './model-transition';

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
 *  - `entering`
 *  - `entered`
 *  - `exiting`
 *  - `exited`
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
 *     <Transition nodeRef={refNode} in={stateIn} duration={500}>
 *       {state => ...}
 *     </Transition>
 *     <button onClick={handleToggleIn}>Toggle</button>
 *   </>;
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `duration`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */
export default function TransitionFucked(props: ITransitionProps): ReactElement | null {
  const {
    nodeRef,
    children,
    in: inProp,
    mountOnEnter,
    unmountOnExit,
    appear,
    enter = true,
    exit,
    duration = 500,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  } = props;
  
  const nextCallbackRef = useRef<null | (() => void)>(null);
  
  const [stateStatus, setStateStatus] = useState<ETransactionStatus>(() => {
    let initialStatus;
    
    if (inProp) {
      if (appear) {
        initialStatus = ETransactionStatus.EXITED;
      } else {
        initialStatus = ETransactionStatus.ENTERED;
      }
    } else {
      if (unmountOnExit || mountOnEnter) {
        initialStatus = ETransactionStatus.UNMOUNTED;
      } else {
        initialStatus = ETransactionStatus.EXITED;
      }
    }
    
    return initialStatus;
  });
  
  const durations: Required<ITransitionDurations> = useMemo((): Required<ITransitionDurations> => {
    let durationAppear: number;
    let durationEnter: number;
    let durationExit: number;
    
    if (typeof duration === 'number') {
      durationAppear = duration;
      durationEnter = duration;
      durationExit = duration;
    } else {
      durationExit = duration.exit ?? 0;
      durationEnter = duration.enter ?? 0;
      durationAppear = duration.appear ?? durationEnter;
    }
    
    return {
      appear: durationAppear,
      enter: durationEnter,
      exit: durationExit
    };
  }, [duration]);
  
  const cancelNextCallback = useCallback(() => {
    if (nextCallbackRef.current !== null) {
      nextCallbackRef.current();
      nextCallbackRef.current = null;
    }
  }, []);
  
  const handleSafeSetState = useCallback((nextState: ETransactionStatus, callback?: () => void) => {
    setStateStatus(nextState);
    
    if (callback) {
      nextCallbackRef.current = callback;
    }
  }, []);
  
  const handleTransitionEnd = useCallback((timeout: number, handler: () => void) => {
    const node = nodeRef.current;
    const doesNotHaveTimeoutOrListener = timeout === null;
    
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(handler, 0);
      
      return;
    }
    
    if (timeout !== null) {
      setTimeout(handler, timeout);
    }
  }, [nodeRef]);
  
  const handlePerformExit = useCallback(() => {
    if (!exit) {
      handleSafeSetState(ETransactionStatus.EXITED, () => {
        onExited?.();
      });
      
      return;
    }
    
    onExit?.();
    
    handleSafeSetState(ETransactionStatus.EXITING, () => {
      onExiting?.();
      
      handleTransitionEnd(durations.exit, () => {
        handleSafeSetState(ETransactionStatus.EXITED, () => {
          onExited?.();
        });
      });
    });
  }, [durations, exit, onExit, handleSafeSetState, onExited, onExiting, handleTransitionEnd]);
  
  const handlePerformEnter = useCallback((mounting: boolean) => {
    const appearing = mounting;
    
    const enterTimeout = appearing ? durations.appear : durations.enter;
    
    if (!mounting && !enter) {
      handleSafeSetState(ETransactionStatus.ENTERED, () => {
        onEntered?.();
      });
      
      return;
    }
    
    onEnter?.(appearing);
    
    handleSafeSetState(ETransactionStatus.ENTERING, () => {
      onEntering?.(appearing);
      
      handleTransitionEnd(enterTimeout, () => {
        handleSafeSetState(ETransactionStatus.ENTERED, () => {
          onEntered?.(appearing);
        });
      });
    });
  }, [durations, enter, onEnter, handleSafeSetState, onEntered, onEntering, handleTransitionEnd]);
  
  const handleUpdateStatus = useCallback((mounting = false, nextStatus: ETransactionStatus | null) => {
    if (nextStatus !== null) {
      cancelNextCallback();
      
      if (nextStatus === ETransactionStatus.ENTERING) {
        if (unmountOnExit || mountOnEnter) {
          const node = nodeRef.current;
          
          if (node) {
            forceReflow(node);
          }
        }
        
        handlePerformEnter(mounting);
      } else {
        handlePerformExit();
      }
    } else if (unmountOnExit && stateStatus === ETransactionStatus.EXITED) {
      setStateStatus(ETransactionStatus.UNMOUNTED);
    }
  }, [unmountOnExit, stateStatus, cancelNextCallback, mountOnEnter, handlePerformEnter, nodeRef, handlePerformExit]);
  
  useEffect(() => {
    if (inProp && stateStatus === ETransactionStatus.UNMOUNTED) {
      setStateStatus(ETransactionStatus.EXITED);
    }
  }, [inProp, stateStatus]);
  
  useEffect(() => {
    handleUpdateStatus(true, appear ? ETransactionStatus.ENTERING : null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    let nextStatus = null;
    
    if (inProp) {
      if (stateStatus !== ETransactionStatus.ENTERING && stateStatus !== ETransactionStatus.ENTERED) {
        nextStatus = ETransactionStatus.ENTERING;
      }
    } else {
      if (stateStatus === ETransactionStatus.ENTERING || stateStatus === ETransactionStatus.ENTERED) {
        nextStatus = ETransactionStatus.EXITING;
      }
    }
    
    handleUpdateStatus(false, nextStatus);
  }, [inProp, stateStatus, handleUpdateStatus]);
  
  if (stateStatus === ETransactionStatus.UNMOUNTED) {
    return null;
  }
  
  return typeof children === 'function' ? children(stateStatus) : cloneElement(Children.only(children));
}
