import {
  createRef
} from 'react';
import {
  afterEach,
  describe,
  expect,
  test
} from 'vitest';

import { act, render } from './utils';

import Transition, { TransitionStatus, TransitionSwitch } from '../src';

describe('TransitionSwitch', () => {
  let log, Parent;
  beforeEach(() => {
    log = [];
    let events = {
      onEnter: (m) => log.push(m ? 'appear' : 'enter'),
      onEntering: (m) => log.push(m ? 'appearing' : 'entering'),
      onEntered: (m) => log.push(m ? 'appeared' : 'entered'),
      onExit: () => log.push('exit'),
      onExiting: () => log.push('exiting'),
      onExited: () => log.push('exited')
    };
    
    const nodeRef = createRef();
    Parent = function Parent({
      on,
      rendered = true
    }) {
      return <TransitionSwitch>
        {rendered ? <Transition
          nodeRef={nodeRef}
          timeout={0}
          key={on ? 'first' : 'second'}
          {...events}
        >
          <span ref={nodeRef}>{on ? 'first' : 'second'}</span></Transition> : null}
      </TransitionSwitch>;
    };
    
    vitest.useFakeTimers();
  });
  
  afterEach(() => {
    vitest.useRealTimers();
  });
  
  test('should have default status ENTERED', () => {
    const nodeRef = createRef();
    
    render(<TransitionSwitch>
      <Transition nodeRef={nodeRef} timeout={0} key="first">
        {(status) => {
          return <span ref={nodeRef}>status: {status}</span>;
        }}
      </Transition></TransitionSwitch>);
    
    expect(nodeRef.current.textContent).toBe(`status: ${TransitionStatus.ENTERED}`);
  });
  
  test('should have default mode: out-in', () => {
    const firstNodeRef = createRef();
    const secondNodeRef = createRef();
    const {
      rerender
    } = render(<TransitionSwitch>
      <Transition nodeRef={firstNodeRef} timeout={0} key="first">
        {(status) => {
          return <span ref={firstNodeRef}>first status: {status}</span>;
        }}
      </Transition></TransitionSwitch>);
    
    rerender(<TransitionSwitch>
      <Transition nodeRef={secondNodeRef} timeout={0} key="second">
        {(status) => <span ref={secondNodeRef}>second status: {status}</span>}
      </Transition></TransitionSwitch>);
    
    expect(firstNodeRef.current.textContent).toBe('first status: exiting');
    expect(secondNodeRef.current).toBe(null);
  });
  
  test('should work without childs', () => {
    const nodeRef = createRef();
    
    expect(() => {
      render(<TransitionSwitch>
        <Transition nodeRef={nodeRef} timeout={0} key="first">
          <span ref={nodeRef} /></Transition></TransitionSwitch>);
    }).not.toThrow();
  });
  
  test('should switch between components on change state', () => {
    const {
      container,
      setProps
    } = render(<Parent on={true} />);
    
    expect(container.textContent).toBe('first');
    setProps({on: false});
    expect(log).toEqual(['exit', 'exiting']);
    act(() => {
      vitest.runAllTimers();
    });
    act(() => {
      vitest.runAllTimers();
    });
    expect(log).toEqual([
      'exit',
      'exiting',
      'exited',
      'enter',
      'entering',
      'entered'
    ]);
    expect(container.textContent).toBe('second');
  });
  
  test('should switch between null and component', () => {
    const {
      container,
      setProps
    } = render(<Parent on={true} rendered={false} />);
    
    expect(container.textContent).toBe('');
    
    vitest.useFakeTimers();
    
    setProps({rendered: true});
    act(() => {
      vitest.runAllTimers();
    });
    expect(log).toEqual(['enter', 'entering', 'entered']);
    expect(container.textContent).toBe('first');
    
    setProps({
      on: false,
      rendered: true
    });
    act(() => {
      vitest.runAllTimers();
    });
    act(() => {
      vitest.runAllTimers();
    });
    expect(log).toEqual([
      'enter',
      'entering',
      'entered',
      'exit',
      'exiting',
      'exited',
      'enter',
      'entering',
      'entered'
    ]);
    
    expect(container.textContent).toBe('second');
  });
});
