import {
  ReactElement,
  Children,
  cloneElement,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react';

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

export default function Transition(props: ITransitionProps): ReactElement | null {
  const {
    nodeRef,
    children,
    in: inProp,
    mountOnEnter,
    unmountOnExit,
    appear,
    enter,
    exit,
    timeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...childProps
  } = props;
  
  const parentGroup = useContext(TransitionGroupContext);
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
  
  const cancelNextCallback = useCallback(() => {
    if (nextCallbackRef.current !== null) {
      nextCallbackRef.current();
      nextCallbackRef.current = null;
    }
  }, []);
  
  const safeSetState = useCallback((nextState: ETransactionStatus, callback?: () => void) => {
    setStateStatus(nextState);
    
    if (callback) {
      nextCallbackRef.current = callback;
    }
  }, []);
  
  const getTimeouts = useCallback(() => {
    let exit, enter, appear;
    exit = enter = appear = timeout;
    
    if (timeout !== null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }
    
    return {
      exit,
      enter,
      appear
    };
  }, [timeout]);
  
  const onTransitionEnd = useCallback((timeout: number, handler: () => void) => {
    const node = nodeRef.current;
    const doesNotHaveTimeoutOrListener = timeout == null;
    
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(handler, 0);
      
      return;
    }
    
    if (timeout !== null) {
      setTimeout(handler, timeout);
    }
  }, [nodeRef]);
  
  const performExit = useCallback(() => {
    const timeouts = getTimeouts();
    const maybeNode = nodeRef.current;
    
    if (!exit) {
      safeSetState(ETransactionStatus.EXITED, () => {
        onExited?.(maybeNode);
      });
      
      return;
    }
    
    onExit?.(maybeNode);
    
    safeSetState(ETransactionStatus.EXITING, () => {
      onExiting?.(maybeNode);
      
      onTransitionEnd(timeouts.exit, () => {
        safeSetState(ETransactionStatus.EXITED, () => {
          onExited?.(maybeNode);
        });
      });
    });
  }, [getTimeouts, nodeRef, exit, onExit, safeSetState, onExited, onExiting, onTransitionEnd]);
  
  const performEnter = useCallback((mounting: boolean) => {
    const appearing = parentGroup ? parentGroup.isMounting : mounting;
    const maybeNode = nodeRef.current;
    
    const timeouts = getTimeouts();
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    
    if (!mounting && !enter) {
      safeSetState(ETransactionStatus.ENTERED, () => {
        onEntered?.(maybeNode);
      });
      
      return;
    }
    
    onEnter?.(maybeNode, appearing);
    
    safeSetState(ETransactionStatus.ENTERING, () => {
      onEntering?.(maybeNode, appearing);
      
      onTransitionEnd(enterTimeout, () => {
        safeSetState(ETransactionStatus.ENTERED, () => {
          onEntered?.(maybeNode, appearing);
        });
      });
    });
  }, [parentGroup, nodeRef, getTimeouts, enter, onEnter, safeSetState, onEntered, onEntering, onTransitionEnd]);
  
  const updateStatus = useCallback((mounting = false, nextStatus: ETransactionStatus | null) => {
    if (nextStatus !== null) {
      cancelNextCallback();
      
      if (nextStatus === ETransactionStatus.ENTERING) {
        if (unmountOnExit || mountOnEnter) {
          const node = nodeRef.current;
          
          if (node) {
            forceReflow(node);
          }
        }
        
        performEnter(mounting);
      } else {
        performExit();
      }
    } else if (unmountOnExit && stateStatus === ETransactionStatus.EXITED) {
      setStateStatus(ETransactionStatus.UNMOUNTED);
    }
  }, [unmountOnExit, stateStatus, cancelNextCallback, mountOnEnter, performEnter, nodeRef, performExit]);
  
  useEffect(() => {
    if (inProp && stateStatus === ETransactionStatus.UNMOUNTED) {
      setStateStatus(ETransactionStatus.EXITED);
    }
  }, [inProp, stateStatus]);
  
  useEffect(() => {
    const appearStatus = parentGroup && !parentGroup.isMounting ? enter : appear;
    
    updateStatus(true, appearStatus ? ETransactionStatus.ENTERING : null);
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
    
    updateStatus(false, nextStatus);
  }, [inProp, stateStatus, updateStatus]);
  
  if (stateStatus === ETransactionStatus.UNMOUNTED) {
    return null;
  }
  
  return <TransitionGroupContext.Provider value={null}>
    {typeof children === 'function' ? children(stateStatus, childProps) : cloneElement(Children.only(children), childProps)}
  </TransitionGroupContext.Provider>;
}
