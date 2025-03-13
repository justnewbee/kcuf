/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';
import {
  act
} from 'react';

import {
  renderHook
} from '@testing-library/react';

import useIsUnmounted from '../src';

describe('useIsUnmounted', () => {
  test('When component is not yet unmounted', () => {
    const {
      result
    } = renderHook(() => useIsUnmounted());
    
    expect(result.current()).toBeFalsy();
  });
  
  test('After component unmount', () => {
    const {
      result,
      unmount
    } = renderHook(() => useIsUnmounted());
    
    act(() => {
      unmount();
    });
    
    expect(result.current()).toBeTruthy();
  });
});
