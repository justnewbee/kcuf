import {
  describe,
  expect,
  test
} from 'vitest';

import pkgInfo from '../package.json';
import {
  nameCssVar
} from '../src';

describe(`${pkgInfo.name}@${pkgInfo.version}`, () => {
  test('nameCssVar', () => {
    expect(nameCssVar(['color', 'gray'])).toEqual('--kf-color--gray');
    expect(nameCssVar(['Color', 'light gray'])).toEqual('--kf-color--light-gray');
    expect(nameCssVar(['Color', 'light_gray'])).toEqual('--kf-color--light-gray');
    expect(nameCssVar(['Color', 'lightGray'])).toEqual('--kf-color--light-gray');
    expect(nameCssVar(['Color', 'LightGray'])).toEqual('--kf-color--light-gray');
  });
  
  test('nameCssVar - custom prefix', () => {
    expect(nameCssVar(['color', 'gray'], 'sb')).toEqual('--sb-color--gray');
    expect(nameCssVar(['Color', 'light gray'], 'Sb')).toEqual('--sb-color--light-gray');
    expect(nameCssVar(['Color', 'light_gray'], 'sB')).toEqual('--sb-color--light-gray');
    expect(nameCssVar(['Color', 'lightGray'], 'SB')).toEqual('--sb-color--light-gray');
    expect(nameCssVar(['Color', 'LightGray'], 'sb')).toEqual('--sb-color--light-gray');
  });
});
