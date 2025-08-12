import {
  StrictMode,
  Children,
  createRef
} from 'react';
import {
  beforeEach,
  afterEach,
  describe,
  expect,
  test
} from 'vitest';

import Transition, {
  TransitionGroup
} from '../src';
import {
  act,
  render
} from './utils';

// Most of the real functionality is covered in other unit tests, this just
// makes sure we're wired up correctly.
describe('TransitionGroup', () => {
  let act, container, log, Child, renderStrict, render;

  beforeEach(() => {
    renderStrict = (element, container) => render(<StrictMode>{element}</StrictMode>, { container });

    container = document.createElement('div');

    log = [];
    let events = {
      onEnter: (m) => log.push(m ? 'appear' : 'enter'),
      onEntering: (m) => log.push(m ? 'appearing' : 'entering'),
      onEntered: (m) => log.push(m ? 'appeared' : 'entered'),
      onExit: () => log.push('exit'),
      onExiting: () => log.push('exiting'),
      onExited: () => log.push('exited'),
    };

    const nodeRef = createRef();
    
    Child = function Child(props) {
      return <Transition nodeRef={nodeRef} timeout={0} {...props} {...events}>
        <span ref={nodeRef} />
      </Transition>;
    };
  });

  test('should allow null components', () => {
    function FirstChild(props) {
      const childrenArray = Children.toArray(props.children);
      
      return childrenArray[0] || null;
    }

    render(<TransitionGroup component={FirstChild}>
      <Child />
    </TransitionGroup>);
  });

  test('should allow callback refs', () => {
    const ref = vitest.fn();

    class Child extends React.Component {
      render() {
        return <span />;
      }
    }

    render(<TransitionGroup>
      <Child ref={ref} />
    </TransitionGroup>);

    expect(ref).toHaveBeenCalled();
  });

  test('should work with no children', () => {
    renderStrict(<TransitionGroup />, container);
  });

  test('should handle transitioning correctly', () => {
    function Parent({ count = 1 }) {
      let children = [];
      for (let i = 0; i < count; i++) {
        children.push(<Child key={i} />);
      }
      
      return <TransitionGroup appear enter exit>
        {children}
      </TransitionGroup>;
    }

    vitest.useFakeTimers();
    renderStrict(<Parent />, container);

    act(() => {
      vitest.runAllTimers();
    });
    
    // React 18 StrictEffects will call `componentDidMount` twice causing two `onEnter` calls.
    expect(log).toEqual(React.useTransition !== undefined ? ['appear', 'appear', 'appearing', 'appeared'] : ['appear', 'appearing', 'appeared']);

    log = [];
    renderStrict(<Parent count={2} />, container);
    act(() => {
      vitest.runAllTimers();
    });
    
    // React 18 StrictEffects will call `componentDidMount` twice causing two `onEnter` calls.
    expect(log).toEqual(React.useTransition !== undefined ? ['enter', 'enter', 'entering', 'entered'] : ['enter', 'entering', 'entered']);

    log = [];
    renderStrict(<Parent count={1} />, container);
    act(() => {
      vitest.runAllTimers();
    });
    
    expect(log).toEqual(['exit', 'exiting', 'exited']);
  });
});
