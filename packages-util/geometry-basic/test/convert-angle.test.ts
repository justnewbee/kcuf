import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  fromRadiansToDegrees,
  fromDegreesToRadians
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('fromRadiansToDegrees(radians: number): number', () => {
    expect(fromRadiansToDegrees(0)).toBe(0);
    expect(fromRadiansToDegrees(Math.PI / 4)).toBe(45);
    expect(fromRadiansToDegrees(Math.PI / 3)).toBe(60);
    expect(fromRadiansToDegrees(Math.PI / 2)).toBe(90);
    expect(fromRadiansToDegrees(Math.PI)).toBe(180);
    expect(fromRadiansToDegrees(Math.PI * 2)).toBe(360);
  });
  
  test('fromDegreesToRadians(degrees: number): number', () => {
    expect(fromDegreesToRadians(0)).toBe(0);
    expect(fromDegreesToRadians(45)).toBe(Math.PI / 4);
    expect(fromDegreesToRadians(60)).toBe(Math.PI / 3);
    expect(fromDegreesToRadians(90)).toBe(Math.PI / 2);
    expect(fromDegreesToRadians(180)).toBe(Math.PI);
    expect(fromDegreesToRadians(360)).toBe(Math.PI * 2);
  });
});