import {
  injectIconFont
} from '@kcuf/rc-icon-base';

// https://at.alicdn.com/t/c/font_4720928_yvtln3fv7v.css
export const ICON_FONT = injectIconFont('4720928', 'yvtln3fv7v', {
  pathExtra: '/c'
});

export const ICON_TYPE_MAPPING = {
  arrowhead: 'e661',
  arrow: 'e665',
  'arrow-to-top': 'e662',
  triangle: 'e664',
  // 状态
  loading: 'e62e',
  info: 'e65a',
  'info-fill': 'e659',
  help: 'e65c',
  'help-fill': 'e65b',
  warn: 'e65d',
  'warn-fill': 'e65e',
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
  fav: 'e65f',
  'fav-fill': 'e660',
  more: 'e617',
  // 杂项
  external: 'e63e'
};
