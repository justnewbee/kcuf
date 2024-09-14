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
    expect(fromRadiansToDegrees(0)).toEqual(0);
    expect(fromRadiansToDegrees(Math.PI / 4)).toEqual(45);
    expect(fromRadiansToDegrees(Math.PI / 3)).toEqual(60);
    expect(fromRadiansToDegrees(Math.PI / 2)).toEqual(90);
    expect(fromRadiansToDegrees(Math.PI)).toEqual(180);
    expect(fromRadiansToDegrees(Math.PI * 2)).toEqual(360);
  });
  
  test('fromDegreesToRadians(degrees: number): number', () => {
    expect(fromDegreesToRadians(0)).toEqual(0);
    expect(fromDegreesToRadians(45)).toEqual(Math.PI / 4);
    expect(fromDegreesToRadians(60)).toEqual(Math.PI / 3);
    expect(fromDegreesToRadians(90)).toEqual(Math.PI / 2);
    expect(fromDegreesToRadians(180)).toEqual(Math.PI);
    expect(fromDegreesToRadians(360)).toEqual(Math.PI * 2);
  });
});