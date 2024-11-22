import {
  injectIconFont
} from '@kcuf/rc-icon-base';

// https://at.alicdn.com/t/c/font_4720928_xs7mdbqv3wd.css
export const ICON_FONT = injectIconFont('4720928', 'xs7mdbqv3wd', {
  pathExtra: '/c'
});

export const ICON_TYPE_MAPPING = {
  arrowhead: 'e661',
  arrow: 'e665',
  'arrow-to-top': 'e662',
  triangle: 'e664',
  // 状态
  loading: 'e62e',
  info: 'e708',
  'info-fill': 'e9cb',
  help: 'e65c',
  'help-fill': 'e65b',
  warn: 'e84a',
  'warn-fill': 'e849',
  success: 'e653',
  'success-fill': 'e655',
  error: 'e654',
  'error-fill': 'e652',
  banned: 'e656',
  // 操作
  close: 'e612',
  search: 'e63c',
  copy: 'e64c',
  refresh: 'e657',
  setting: 'e641',
  more: 'e617',
  // 杂项
  avatar: 'e615',
  code: 'e7da',
  external: 'e63e'
};
