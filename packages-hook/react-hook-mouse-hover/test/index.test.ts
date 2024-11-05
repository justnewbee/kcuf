/* global describe, it, expect */
// import {
//   renderHook
// } from '@testing-library/react';

import pkgInfo from '../package.json';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  it('exports in correct type', () => {
    expect(typeof 'TODO').toBe('function');
  });
//   it('should return true if component is mounted', () => {
//     const {
//       result
//     } = renderHook(() => useIsUnmounted());
//
//     expect(result.current()).toBe(false);
//   });
//
//   it('should return false if component is unmounted', () => {
//     const {
//       result,
//       unmount
//     } = renderHook(() => useIsUnmounted());
//
//     unmount();
//     expect(result.current()).toBe(true);
//   });
//
//   it('should be defined', () => {
//     expect(useIsUnmounted).toBeDefined();
//   });
});
