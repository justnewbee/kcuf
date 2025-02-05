import {
  IClickHijacker
} from '../types';

// 在 DOM 上加此属性（不需要值）可强制绕过劫持
export const DATA_NAME_IGNORE = 'data-click-hijack-ignore';

// 全局点击劫持只需要一个事件，该事件会遍历这个列表
export const GLOBAL_CLICK_HIJACKERS: IClickHijacker<any>[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
