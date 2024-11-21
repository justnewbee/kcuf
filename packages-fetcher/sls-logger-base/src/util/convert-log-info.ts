import {
  ISlsLogPayload
} from '../types';

/**
 * 发送的 JSON 里边不可以有除了字符串以外的值，否则报错
 *
 * - code = PostBodyInvalid
 * - message = Value in log is not string data type
 */
export default function convertLogInfo(info: ISlsLogPayload): Record<string, string> {
  const o: Record<string, string> = {};
  
  Object.keys(info).forEach(k => {
    const v = info[k];
    
    if (v === '' || v === null || v === undefined) {
      return;
    }
    
    if (typeof v === 'string') {
      o[k] = v;
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      o[k] = v.toString();
    } else {
      try { // 避免 cyclic error
        o[k] = JSON.stringify(v);
      } catch (_err) {
        o[k] = 'TypeError: cyclic object value';
      }
    }
  });
  
  /**
   * SLS 说不要用 __topic__ 做检索... ~~但又必须每条日志有个 __topic__...~~ <- 刚看了文档 __topic__ 非必填
   * 在发送多条日志的时候，无法通过内部的 __topic__ 检索到相关的内容，这是一个很奇葩的设定，所以这里给每条日志
   * 增加一个 _TOPIC 属性用来检索的时候替代 __topic__
   *
   * 详情 https://aone.alibaba-inc.com/issue/34492769
   */
  o._TOPIC = o.__topic__!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  
  return o;
}
