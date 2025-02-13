import {
  describe,
  expect,
  test
} from 'vitest';

import {
  random
} from '../src';

describe('random', () => {
  test('will random normalized colors', () => {
    expect(/^#[0-9a-f]{3,8}$/.test(random())).toBe(true);
    expect(/^rgb\(\d+ \d+ \d+\)$/.test(random('rgb'))).toBe(true);
    expect(/^hsl\([\d.]+ [\d.]+% [\d.]+%\)$/.test(random('hsl'))).toBe(true);
  });
});
