import React from 'react';

import { act, render } from './utils';

import TransitionClass, { ENTERED } from '../src/transition-class';
import TransitionSwitch from '../src/transition-switch';

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
      onExited: () => log.push('exited'),
    };

    const nodeRef = React.createRef();
    Parent = function Parent({ on, rendered = true }) {
      return <TransitionSwitch>
        {rendered ? <TransitionClass
          nodeRef={nodeRef}
          timeout={0}
          key={on ? 'first' : 'second'}
          {...events}
        >
          <span ref={nodeRef}>{on ? 'first' : 'second'}</span>
        </TransitionClass> : null}
      </TransitionSwitch>;
    };

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have default status ENTERED', () => {
    const nodeRef = React.createRef();
    render(
      <TransitionSwitch>
        <TransitionClass nodeRef={nodeRef} timeout={0} key="first">
          {(status) => {
            return <span ref={nodeRef}>status: {status}</span>;
          }}
        </TransitionClass>
      </TransitionSwitch>
    );

    expect(nodeRef.current.textContent).toBe(`status: ${ENTERED}`);
  });

  it('should have default mode: out-in', () => {
    const firstNodeRef = React.createRef();
    const secondNodeRef = React.createRef();
    const { rerender } = render(
      <TransitionSwitch>
        <TransitionClass nodeRef={firstNodeRef} timeout={0} key="first">
          {(status) => {
            return <span ref={firstNodeRef}>first status: {status}</span>;
          }}
        </TransitionClass>
      </TransitionSwitch>
    );
    rerender(
      <TransitionSwitch>
        <TransitionClass nodeRef={secondNodeRef} timeout={0} key="second">
          {(status) => {
            return <span ref={secondNodeRef}>second status: {status}</span>;
          }}
        </TransitionClass>
      </TransitionSwitch>
    );

    expect(firstNodeRef.current.textContent).toBe('first status: exiting');
    expect(secondNodeRef.current).toBe(null);
  });

  it('should work without childs', () => {
    const nodeRef = React.createRef();
    expect(() => {
      render(
        <TransitionSwitch>
          <TransitionClass nodeRef={nodeRef} timeout={0} key="first">
            <span ref={nodeRef} />
          </TransitionClass>
        </TransitionSwitch>
      );
    }).not.toThrow();
  });

  it('should switch between components on change state', () => {
    const { container, setProps } = render(<Parent on={true} />);

    expect(container.textContent).toBe('first');
    setProps({ on: false });
    expect(log).toEqual(['exit', 'exiting']);
    act(() => {
      jest.runAllTimers();
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(log).toEqual([
      'exit',
      'exiting',
      'exited',
      'enter',
      'entering',
      'entered',
    ]);
    expect(container.textContent).toBe('second');
  });

  it('should switch between null and component', () => {
    const { container, setProps } = render(
      <Parent on={true} rendered={false} />
    );

    expect(container.textContent).toBe('');

    jest.useFakeTimers();

    setProps({ rendered: true });
    act(() => {
      jest.runAllTimers();
    });
    expect(log).toEqual(['enter', 'entering', 'entered']);
    expect(container.textContent).toBe('first');

    setProps({ on: false, rendered: true });
    act(() => {
      jest.runAllTimers();
    });
    act(() => {
      jest.runAllTimers();
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
      'entered',
    ]);

    expect(container.textContent).toBe('second');
  });
});
