/**
 * @vitest-environment jsdom
 */
import {
  ReactElement,
  useCallback,
  useEffect,
  useRef
} from 'react';
import {
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';

import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import {
  useDebouncedCallback
} from '../src';

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  test('will call callback when timeout is called', () => {
    const callback = vi.fn();
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, 1000);
      
      debounced();
      
      return null;
    }
    
    render(<Component />);
    
    expect(callback.mock.calls.length).toBe(0);
    
    act(() => {
      vi.runAllTimers();
    });
    
    expect(callback.mock.calls.length).toBe(1);
  });
  
  test('will call immediate callback immediately (but only once)', () => {
    const callback = vi.fn();

    function Component(): null {
      const debounced = useDebouncedCallback(callback, {
        delay: 1000,
        immediate: true
      });
      
      debounced();
      
      return null;
    }

    render(<Component />);

    expect(callback.mock.calls.length).toBe(1);

    act(() => {
      vi.runAllTimers();
    });

    expect(callback.mock.calls.length).toBe(1);
  });
  
  test('will call immediate callback as well as next debounced call', () => {
    const callback = vi.fn();
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, {
        delay: 1000,
        immediate: true
      });
      
      debounced();
      debounced();
      
      return null;
    }
    
    render(<Component />);
    
    expect(callback.mock.calls.length).toBe(1);
    
    act(() => {
      vi.runAllTimers();
    });
    
    expect(callback.mock.calls.length).toBe(2);
  });
  
  test('will call three callbacks if no debounced callbacks are pending', () => {
    const callback = vi.fn();
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, {
        delay: 1000,
        immediate: true
      });
      
      debounced();
      debounced();
      
      setTimeout(() => {
        debounced();
      }, 1001);
      
      return null;
    }
    
    render(<Component />);
    
    expect(callback.mock.calls.length).toBe(1);
    
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    
    expect(callback.mock.calls.length).toBe(3);
  });
  
  test('will call a second immediate callback if no debounced callbacks are pending with trailing false', () => {
    const callback = vi.fn();
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, {
        delay: 1000,
        immediate: true
      });
      
      debounced();
      
      setTimeout(() => {
        debounced();
      }, 1001);
      
      return null;
    }
    
    render(<Component />);
    
    expect(callback.mock.calls.length).toBe(1);
    
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    
    expect(callback.mock.calls.length).toBe(2);
  });
  
  test('will NOT call both on the immediate edge and on the trailing edge if immediate and function call is only once', () => {
    const callback = vi.fn();
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, {
        delay: 1000,
        immediate: true
      });
      
      debounced();
      
      return null;
    }
    
    render(<Component />);
    
    expect(callback.mock.calls.length).toBe(1);
    
    act(() => {
      vi.runAllTimers();
    });
    
    expect(callback.mock.calls.length).toBe(1);
  });
  
  test('will call both on the immediate edge and on the trailing edge if immediate and there are more than 1 function call', () => {
    const callback = vi.fn();
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, {
        delay: 1000,
        immediate: true
      });
      
      debounced();
      debounced();
      
      return null;
    }
    
    render(<Component />);
    
    expect(callback.mock.calls.length).toBe(1);
    
    act(() => {
      vi.runAllTimers();
    });
    
    expect(callback.mock.calls.length).toBe(2);
  });
  
  /* test.each`
    options                                              | _0   | _190 | _200 | _210 | _500
    ${{
    immediate: true,
    trailing: true
  }}                 | ${1} | ${1} | ${1} | ${1} | ${2}
    ${{
    immediate: true,
    trailing: false
  }}                | ${1} | ${1} | ${1} | ${1} | ${1}
    ${{
    immediate: false,
    trailing: true
  }}                | ${0} | ${0} | ${0} | ${0} | ${1}
    ${{
    immediate: false,
    trailing: false
  }}               | ${0} | ${0} | ${0} | ${0} | ${0}
    ${{
    immediate: true,
    trailing: true,
    delayMax: 190
  }}   | ${1} | ${1} | ${2} | ${2} | ${3}
    ${{
    immediate: true,
    trailing: false,
    delayMax: 190
  }}  | ${1} | ${1} | ${1} | ${2} | ${2}
    ${{
    immediate: false,
    trailing: true,
    delayMax: 190
  }}  | ${0} | ${0} | ${1} | ${1} | ${2}
    ${{
    immediate: true,
    trailing: true,
    delayMax: 200
  }}   | ${1} | ${1} | ${2} | ${2} | ${3}
    ${{
    immediate: true,
    trailing: false,
    delayMax: 200
  }}  | ${1} | ${1} | ${1} | ${2} | ${2}
    ${{
    immediate: false,
    trailing: true,
    delayMax: 200
  }}  | ${0} | ${0} | ${1} | ${1} | ${2}
    ${{
    immediate: false,
    trailing: false,
    delayMax: 200
  }} | ${0} | ${0} | ${0} | ${0} | ${0}
    ${{
    immediate: true,
    trailing: true,
    delayMax: 210
  }}   | ${1} | ${1} | ${1} | ${2} | ${3}
    ${{
    immediate: true,
    trailing: false,
    delayMax: 210
  }}  | ${1} | ${1} | ${1} | ${1} | ${2}
    ${{
    immediate: false,
    trailing: true,
    delayMax: 210
  }}  | ${0} | ${0} | ${0} | ${1} | ${2}
  `('options=$options', ({
    options,
    _0,
    _190,
    _200,
    _210,
    _500
  }) => {
    const callback = vi.fn();
    
    function Component() {
      // @ts-ignore
      const debounced = useDebouncedCallback(callback, 200, options);
      
      debounced();
      expect(callback.mock.calls.length).toBe(_0);
      
      setTimeout(() => {
        expect(callback.mock.calls.length).toBe(_190);
        debounced();
      }, 191);
      
      setTimeout(() => {
        expect(callback.mock.calls.length).toBe(_200);
        debounced();
      }, 201);
      
      setTimeout(() => {
        expect(callback.mock.calls.length).toBe(_210);
        debounced();
      }, 211);
      
      setTimeout(() => {
        expect(callback.mock.calls.length).toBe(_500);
      }, 500);
      
      return null;
    }
    
    render(<Component />);
    
    act(() => {
      vi.runAllTimers();
    });
  }); */
  
  test('will call callback only with the latest params', () => {
    const callback = vi.fn((param: string) => {
      expect(param).toBe('Right param');
    });
    
    function Component(): null {
      const debounced = useDebouncedCallback(callback, 1000);
      
      debounced('Wrong param');
      
      setTimeout(() => {
        debounced('Right param');
      }, 500);
      
      return null;
    }
    
    render(<Component />);
    
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(callback.mock.calls.length).toBe(0);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(callback.mock.calls.length).toBe(1);
  });
  
  // test('will cancel delayed callback when cancel method is called', () => {
  //   const callback = vi.fn();
  //
  //   function Component() {
  //     const debounced = useDebouncedCallback(callback, 1000);
  //     debounced();
  //     setTimeout(debounced.cancel, 500);
  //     return null;
  //   }
  //
  //   render(<Component />);
  //
  //   act(() => {
  //     vi.runAllTimers();
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(0);
  // });
  
  test('will change callback function, if params from dependencies has changed', () => {
    function Component({
      text
    }: {
      text: string;
    }): ReactElement {
      const debounced = useDebouncedCallback(useCallback(vi.fn(() => { // eslint-disable-line react-hooks/exhaustive-deps
        expect(text).toBe('Right param');
      }), [text]), 1000);
      
      // eslint-disable-next-line jsx-a11y/aria-role
      return <button role="click" onClick={debounced} />;
    }
    
    const tree = render(<Component text="Wrong param" />);
    
    tree.rerender(<Component text="Right param" />);
    
    act(() => {
      fireEvent.click(screen.getByRole('click'));
    });
    
    act(() => {
      vi.runAllTimers();
    });
    
    tree.unmount();
  });
  
  test('will NOT change callback function, if params from dependencies has not changed', () => {
    function Component({
      text
    }: {
      text: string;
    }): ReactElement {
      const debounced = useDebouncedCallback(useCallback(vi.fn(() => { // eslint-disable-line react-hooks/exhaustive-deps
        expect(text).toBe('Right param');
      }), []), 1000);
      
      // eslint-disable-next-line jsx-a11y/aria-role
      return <button role="click" onClick={debounced} />;
    }
    
    const tree = render(<Component text="Right param" />);
    
    tree.rerender(<Component text="Wrong param" />);
    
    fireEvent.click(screen.getByRole('click'));
    
    act(() => {
      vi.runAllTimers();
    });
    
    tree.unmount();
  });
  
  test('call callback with the latest value if delayMax time exceed', () => {
    const callback = (value: string): void => {
      expect(value).toBe('Right value');
    };
    
    function Component({
      text
    }: {
      text: string;
    }): ReactElement {
      const debounced = useDebouncedCallback(callback, {
        delay: 500,
        delayMax: 600
      });
      
      debounced(text);
      
      return <span>{text}</span>;
    }
    
    const tree = render(<Component text="Wrong Value" />);
    
    act(() => {
      vi.advanceTimersByTime(400);
      
      tree.rerender(<Component text="Right value" />);
    });
    
    act(() => vi.advanceTimersByTime(400));
    
    tree.unmount();
  });
  
  test('will call callback if delayMax time exceed', () => {
    const callback = vi.fn();
    
    function Component({
      text
    }: {
      text: string;
    }): ReactElement {
      const debounced = useDebouncedCallback(callback, {
        delay: 500,
        delayMax: 600
      });
      
      debounced();
      
      // eslint-disable-next-line jsx-a11y/aria-role
      return <span role="test">{text}</span>;
    }
    
    const tree = render(<Component text="one" />);
    
    expect(callback.mock.calls.length).toBe(0);
    expect(screen.getByRole('test').textContent).toBe('one');
    
    act(() => {
      vi.advanceTimersByTime(400);
      tree.rerender(<Component text="test" />);
    });
    
    expect(callback.mock.calls.length).toBe(0);
    expect(screen.getByRole('test').textContent).toBe('test');
    
    act(() => {
      vi.advanceTimersByTime(400);
    });
    
    expect(callback.mock.calls.length).toBe(1);
    
    tree.unmount();
  });
  
  // test('will cancel callback if delayMax time exceed and cancel method was invoked', () => {
  //   const callback = vi.fn();
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(callback, {
  //       delay: 500,
  //       delayMax: 600
  //     });
  //
  //     debounced();
  //
  //     if (text === 'test') {
  //       debounced.cancel();
  //     }
  //
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   // @ts-ignore
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     vi.advanceTimersByTime(400);
  //     // @ts-ignore
  //     expect(screen.getByRole('test').textContent).toBe('one');
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   tree.rerender(<Component text="test" />);
  //
  //   act(() => {
  //     vi.advanceTimersByTime(400);
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(0);
  // });
  
  // test('will call pending callback if callPending function is called', () => {
  //   const callback = vi.fn();
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(callback, 500);
  //
  //     debounced();
  //
  //     if (text === 'test') {
  //       debounced.flush();
  //     }
  //
  //     // eslint-disable-next-line jsx-a11y/aria-role
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     tree.rerender(<Component text="test" />);
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(1);
  // });
  
  // test('won\t call pending callback if callPending function is called and there are no items in queue', () => {
  //   const callback = vi.fn();
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(callback, 500);
  //
  //     if (text === 'test') {
  //       debounced.flush();
  //     }
  //
  //     // eslint-disable-next-line jsx-a11y/aria-role
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     tree.rerender(<Component text="test" />);
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(screen.getByRole('test').textContent).toBe('test');
  // });
  
  // test('won\t call pending callback if callPending function is called and cancel method is also executed', () => {
  //   const callback = vi.fn();
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(callback, 500);
  //
  //     debounced();
  //
  //     if (text === 'test') {
  //       debounced.cancel();
  //       debounced.flush();
  //     }
  //
  //     // eslint-disable-next-line jsx-a11y/aria-role
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     tree.rerender(<Component text="test" />);
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(screen.getByRole('test').textContent).toBe('test');
  // });
  
  // test('will call pending callback if callPending function is called on component unmount', () => {
  //   const callback = vi.fn();
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(callback, 500);
  //
  //     debounced();
  //
  //     useEffect(() => {
  //       return () => debounced.flush();
  //     }, []);
  //
  //     // eslint-disable-next-line jsx-a11y/aria-role
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     tree.unmount();
  //   });
  //
  //   expect(callback.mock.calls.length).toBe(1);
  // });
  
  test('will memoize debouncedCallback', () => {
    let debouncedCallbackCached: null | (() => void) = null;
    
    function Component({
      text
    }: {
      text: string;
    }): ReactElement {
      const debounced = useDebouncedCallback(useCallback(() => {
        // empty
      }, []), 500);
      
      if (debouncedCallbackCached) {
        expect(debounced).toBe(debouncedCallbackCached);
      }
      
      debouncedCallbackCached = debounced;
      
      // eslint-disable-next-line jsx-a11y/aria-role
      return <span role="test">{text}</span>;
    }
    
    const tree = render(<Component text="one" />);
    
    expect(screen.getByRole('test').textContent).toBe('one');
    
    act(() => {
      tree.rerender(<Component text="two" />);
    });
    
    tree.unmount();
  });
  
  test('will change reference to debouncedCallback timeout is changed', () => {
    expect.assertions(3);
    let debouncedCallbackCached: null | (() => void) = null;
    let timeoutCached: number | null = null;
    
    function Component({
      text,
      timeout
    }: {
      text: string;
      timeout: number;
    }): ReactElement {
      const debounced = useDebouncedCallback(useCallback(() => {
        // empty
      }, []), timeout);
      
      if (debouncedCallbackCached) {
        if (timeoutCached === timeout) {
          expect(debounced).toBe(debouncedCallbackCached);
        } else {
          expect(debounced).not.toBe(debouncedCallbackCached);
        }
      }
      
      debouncedCallbackCached = debounced;
      timeoutCached = timeout;
      
      // eslint-disable-next-line jsx-a11y/aria-role
      return <span role="test">{text}</span>;
    }
    
    const tree = render(<Component timeout={500} text="one" />);
    
    expect(screen.getByRole('test').textContent).toBe('one');
    
    act(() => {
      tree.rerender(<Component text="one" timeout={500} />);
    });
    
    act(() => {
      tree.rerender(<Component text="1000" timeout={1000} />);
    });
    
    tree.unmount();
  });
  
  test('will call the latest callback', () => {
    expect.assertions(1);
    
    function Component({
      callback
    }: {
      callback(n: number): void;
    }): null {
      const debounced = useDebouncedCallback(callback, 500);
      const counter = useRef(1);
      
      useEffect(() => {
        // this useEffect should be called only once
        debounced(counter.current);
        
        counter.current = counter.current + 1;
      }, [debounced]);
      
      return null;
    }
    
    const tree = render(<Component callback={() => {
      throw new Error('This callback shouldn\'t be executed');
    }} />);
    
    act(() => {
      tree.rerender(<Component callback={(counter: number) => {
        expect(counter).toBe(1); // this callback should be called with counter === 1
      }} />);
    });
    
    vi.advanceTimersByTime(500);
    
    tree.unmount();
  });
  
  test('will change reference to debouncedCallback if delayMax or delay option is changed', () => {
    expect.assertions(5);
    
    let debouncedCallbackCached: unknown = null;
    let cachedObj: {
      text: string;
      delay: number;
      delayMax?: number;
    } | null = null;
    
    function Component({
      text,
      delay = 500,
      delayMax = 1000
    }: {
      text: string;
      delay?: number;
      delayMax?: number;
    }): ReactElement {
      const debounced = useDebouncedCallback(useCallback(() => {
        // empty
      }, []), {
        delay,
        delayMax
      });
      
      if (debouncedCallbackCached) {
        if (cachedObj?.delay === delay && cachedObj.delayMax === delayMax) {
          expect(debounced).toBe(debouncedCallbackCached);
        } else {
          expect(debounced).not.toBe(debouncedCallbackCached);
        }
      }
      
      debouncedCallbackCached = debounced;
      
      cachedObj = {
        text,
        delay,
        delayMax
      };
      
      // eslint-disable-next-line jsx-a11y/aria-role
      return <span role="test">{text}</span>;
    }
    
    const tree = render(<Component text="one" />);
    
    expect(screen.getByRole('test').textContent).toBe('one');
    
    act(() => {
      tree.rerender(<Component text="one" />);
    });
    
    act(() => {
      tree.rerender(<Component text="two" />);
    });
    
    act(() => {
      tree.rerender(<Component text="two" delay={1} />);
    });
    
    act(() => {
      tree.rerender(<Component delayMax={2} text="two" />);
    });
    
    tree.unmount();
  });
  
  // test('will memoize callPending', () => {
  //   let callPendingCached: any = null;
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(useCallback(() => {}, []), 500);
  //
  //     if (callPendingCached) {
  //       expect(debounced.flush).toBe(callPendingCached);
  //     }
  //
  //     callPendingCached = debounced.flush;
  //
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     tree.rerender(<Component text="two" />);
  //   });
  // });
  
  // test('will memoize debounced object', () => {
  //   let cached: any = null;
  //
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(useCallback(() => {}, []), 500);
  //
  //     if (cached) {
  //       expect(debounced).toBe(cached);
  //     }
  //
  //     cached = debounced;
  //
  //     // eslint-disable-next-line jsx-a11y/aria-role
  //     return <span role="test">{text}</span>;
  //   }
  //
  //   const tree = render(<Component text="one" />);
  //
  //   expect(screen.getByRole('test').textContent).toBe('one');
  //
  //   act(() => {
  //     tree.rerender(<Component text="two" />);
  //   });
  // });
  
  // test('pending indicates whether we have pending callbacks', () => {
  //   function Component({
  //     text
  //   }: {
  //     text: string;
  //   }): ReactElement {
  //     const debounced = useDebouncedCallback(useCallback(() => {}, []), 500);
  //
  //     expect(debounced.isPending()).toBeFalsy();
  //     debounced();
  //     expect(debounced.isPending()).toBeTruthy();
  //     debounced.flush();
  //     expect(debounced.isPending()).toBeFalsy();
  //
  //     return <span>{text}</span>;
  //   }
  //
  //   render(<Component text="one" />);
  // });
});
