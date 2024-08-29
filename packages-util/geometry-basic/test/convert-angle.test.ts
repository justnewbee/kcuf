import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  convertAngleFromRadiansToDegrees,
  convertAngleFromDegreesToRadians
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('convertAngleFromRadiansToDegrees(radians: number): number', () => {
    expect(convertAngleFromRadiansToDegrees(0)).toEqual(0);
    expect(convertAngleFromRadiansToDegrees(Math.PI / 4)).toEqual(45);
    expect(convertAngleFromRadiansToDegrees(Math.PI / 3)).toEqual(60);
    expect(convertAngleFromRadiansToDegrees(Math.PI / 2)).toEqual(90);
    expect(convertAngleFromRadiansToDegrees(Math.PI)).toEqual(180);
    expect(convertAngleFromRadiansToDegrees(Math.PI * 2)).toEqual(360);
  });
  
  test('convertAngleFromDegreesToRadians(degrees: number): number', () => {
    expect(convertAngleFromDegreesToRadians(0)).toEqual(0);
    expect(convertAngleFromDegreesToRadians(45)).toEqual(Math.PI / 4);
    expect(convertAngleFromDegreesToRadians(60)).toEqual(Math.PI / 3);
    expect(convertAngleFromDegreesToRadians(90)).toEqual(Math.PI / 2);
    expect(convertAngleFromDegreesToRadians(180)).toEqual(Math.PI);
    expect(convertAngleFromDegreesToRadians(360)).toEqual(Math.PI * 2);
  });
});