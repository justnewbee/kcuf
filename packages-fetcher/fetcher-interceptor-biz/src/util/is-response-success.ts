import {
  TResponseResult,
  TIsSuccess
} from '../types';

export default function isResponseSuccess(o: TResponseResult, checker?: TIsSuccess): boolean {
  if (typeof checker === 'boolean') {
    return checker;
  }
  
  if (typeof checker === 'function') {
    return checker(o);
  }
  
  return String(o.code) === '200'; // default，兼容数字和字符串
}
