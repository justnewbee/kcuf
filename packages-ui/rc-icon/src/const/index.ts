import {
  injectIconFont
} from '@kcuf-ui/rc-icon-base';

// https://at.alicdn.com/t/c/font_4720928_p25pnn0f8dn.css
export const ICON_FONT = injectIconFont('4720928', 'p25pnn0f8dn', {
  pathExtra: '/c'
});

export const ICON_TYPE_MAPPING = {
  loading: 'e62e',
  arrowhead: 'e661',
  arrow: 'e665',
  'arrow-to-top': 'e681',
  triangle: 'e664',
  // 状态
  info: 'e708',
  'info-fill': 'e9cb',
  help: 'e65c',
  'help-fill': 'e65b',
  warn: 'e683',
  'warn-fill': 'e68c',
  success: 'e653',
  'success-fill': 'e655',
  error: 'e654',
  'error-fill': 'e652',
  banned: 'e656',
  empty: 'e71d',
  // 操作
  close: 'e612',
  clear: 'e612',
  copy: 'e64c',
  refresh: 'e657',
  setting: 'e641',
  drag: 'e66d',
  search: 'e67d',
  'zoom-in': 'e684',
  'zoom-out': 'e685',
  more: 'e617',
  // 杂项
  avatar: 'e682',
  'avatar-fill': 'e68b',
  code: 'e7da',
  external: 'e63e'
};
