/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  beforeEach
} from 'vitest';

import pkgInfo from '../package.json';
import lib from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  beforeEach(() => {
    // TODO
  });
  
  test('xx', () => {
    expect(lib).toBeTypeOf('function');
  });
});