import {
  describe,
  expect,
  test
} from 'vitest';

import {
  nameConst
} from '../src';

describe('nameConst', () => {
  test('nameConst', () => {
    expect(nameConst('hello')).toEqual('HELLO');
    expect(nameConst('hello world')).toEqual('HELLO_WORLD');
    expect(nameConst('hello', 'world')).toEqual('HELLO_WORLD');
  });
});
