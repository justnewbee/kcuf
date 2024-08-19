import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  nameConst
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('nameConst', () => {
    expect(nameConst('hello')).toEqual('HELLO');
    expect(nameConst('hello world')).toEqual('HELLO_WORLD');
    expect(nameConst('hello', 'world')).toEqual('HELLO_WORLD');
  });
});
