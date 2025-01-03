import {
  Component,
  isValidElement,
  cloneElement
} from 'react';

import {
  ETransactionMode,
  ETransactionStatus
} from './enum';
import TransitionGroupContext from './transition-group-context';
import { ITransitionSwitchProps } from './types';

function areChildrenDifferent(oldChildren, newChildren) {
  if (oldChildren === newChildren) {
    return false;
  }
  
  if (isValidElement(oldChildren) && isValidElement(newChildren) && oldChildren.key != null && oldChildren.key === newChildren.key) {
    return false;
  }
  
  return true;
}

const callHook =
  (element, name, cb) =>
    (...args) => {
      element.props[name] && element.props[name](...args);
      cb();
    };

const leaveRenders = {
  [ETransactionMode.OUT]: ({
    current,
    changeState
  }) =>
    cloneElement(current, {
      in: false,
      onExited: callHook(current, 'onExited', () => {
        changeState(ETransactionStatus.ENTERING, null);
      })
    }),
  [ETransactionMode.IN]: ({
    current,
    changeState,
    children
  }) => [
    current,
    cloneElement(children, {
      in: true,
      onEntered: callHook(children, 'onEntered', () => {
        changeState(ETransactionStatus.ENTERING);
      })
    })
  ]
};

const enterRenders = {
  [ETransactionMode.OUT]: ({
    children,
    changeState
  }) =>
    cloneElement(children, {
      in: true,
      onEntered: callHook(children, 'onEntered', () => {
        changeState(ETransactionStatus.ENTERED, cloneElement(children, {in: true}));
      })
    }),
  [ETransactionMode.IN]: ({
    current,
    children,
    changeState
  }) => [
    cloneElement(current, {
      in: false,
      onExited: callHook(current, 'onExited', () => {
        changeState(ETransactionStatus.ENTERED, cloneElement(children, {in: true}));
      })
    }),
    cloneElement(children, {
      in: true
    })
  ]
};

/**
 * A transition component inspired by the [vue transition modes](https://vuejs.org/v2/guide/transitions.html#Transition-Modes).
 * You can use it when you want to control the render between state transitions.
 * Based on the selected mode and the child's key which is the `Transition` or `CSSTransition` component, the `TransitionSwitch` makes a consistent transition between them.
 *
 * If the `out-in` mode is selected, the `TransitionSwitch` waits until the old child leaves and then inserts a new child.
 * If the `in-out` mode is selected, the `TransitionSwitch` inserts a new child first, waits for the new child to enter and then removes the old child.
 *
 * **Note**: If you want the animation to happen simultaneously
 * (that is, to have the old child removed and a new child inserted **at the same time**),
 * you should use
 * [`TransitionGroup`](https://reactcommunity.org/react-transition-group/transition-group)
 * instead.
 *
 * ```tsx
 * function App() {
 *  const [state, setState] = useState(false);
 *  const helloRef = useRef(null);
 *  const goodbyeRef = useRef(null);
 *  const nodeRef = state ? goodbyeRef : helloRef;
 *
 *  return <TransitionSwitch>
 *    <CSSTransition
 *      key={state ? "Goodbye, world!" : "Hello, world!"}
 *      nodeRef={nodeRef}
 *      addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
 *      classNames='fade'
 *    >
 *      <button ref={nodeRef} onClick={() => setState(state => !state)}>
 *        {state ? "Goodbye, world!" : "Hello, world!"}
 *      </button>
 *    </CSSTransition>
 *  </TransitionSwitch>;
 * }
 * ```
 *
 * ```css
 * .fade-enter {
 *    opacity: 0;
 * }
 * .fade-exit {
 *    opacity: 1;
 * }
 *
 * .fade-enter-active {
 *    opacity: 1;
 * }
 *
 * .fade-exit-active {
 *    opacity: 0;
 * }
 *
 * .fade-enter-active,
 * .fade-exit-active {
 *    transition: opacity 500ms;
 * }
 * ```
 */
export default class TransitionSwitch extends Component<ITransitionSwitchProps> {
  state = {
    status: ETransactionStatus.ENTERED,
    current: null
  };
  
  appeared = false;
  
  componentDidMount() {
    this.appeared = true;
  }
  
  static getDerivedStateFromProps(props, state) {
    if (!props.children) {
      return {
        current: null
      };
    }
    
    if (state.status === ETransactionStatus.ENTERING && props.mode === ETransactionMode.IN) {
      return {
        status: ETransactionStatus.ENTERING
      };
    }
    
    if (state.current && areChildrenDifferent(state.current, props.children)) {
      return {
        status: ETransactionStatus.EXITING
      };
    }
    
    return {
      current: cloneElement(props.children, {
        in: true
      })
    };
  }
  
  changeState = (status, current = this.state.current) => {
    this.setState({
      status,
      current
    });
  };
  
  render() {
    const {
      props: {
        children,
        mode = ETransactionMode.OUT
      },
      state: {
        status,
        current
      }
    } = this;
    
    const data = {
      children,
      current,
      changeState: this.changeState,
      status
    };
    let component;
    
    switch (status) {
    case ETransactionStatus.ENTERING:
      component = enterRenders[mode](data);
      
      break;
    case ETransactionStatus.EXITING:
      component = leaveRenders[mode](data);
      
      break;
    case ETransactionStatus.ENTERED:
      component = current;
      
      break;
    }
    
    return <TransitionGroupContext.Provider value={{isMounting: !this.appeared}}>
      {component}
    </TransitionGroupContext.Provider>;
  }
}
