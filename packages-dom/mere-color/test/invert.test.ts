import {
  describe,
  expect,
  test
} from 'vitest';

import {
  invert
} from '../src';

describe('invert', () => {
  test('todo', () => {
    expect(typeof invert).toBe('function');
  });
  // test('should invert a reduced hex color', () => {
  //   expect(invert('#448')).toEqual('#bb7');
  // });
  //
  // test('should invert a hex color', () => {
  //   expect(invert('#CCCD64')).toEqual('#33329b');
  // });
  //
  // test('should invert an 8-digit hex color', () => {
  //   expect(invert('#6564CDB3')).toEqual('rgba(154,155,50,0.7)');
  // });
  //
  // test('should invert an 4-digit hex color', () => {
  //   expect(invert('#0f08')).toEqual('rgba(255,0,255,0.53)');
  // });
  //
  // test('should invert a color with opacity', () => {
  //   expect(invert('rgba(101,100,205,0.7)')).toEqual('rgba(154,155,50,0.7)');
  // });
  //
  // test('should return transparent when passed transparent', () => {
  //   expect(invert('transparent')).toEqual('transparent');
  // });
});
