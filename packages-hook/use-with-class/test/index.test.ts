/* global describe, it, expect */

import pkgInfo from '../package.json';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  it('exports in correct type', () => {
    expect(typeof 'TODO').toBe('function');
  });
});
