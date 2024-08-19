import {
  TGetData,
  TGetString,
  TIsSuccess
} from './common';

/**
 * 可以在调用 fetcher 请求时，覆盖默认的设置以适应某些特殊的场景，从而避免必须多生 Fetcher 实例的尴尬
 */
export interface IFetcherConfigAugment {
  /**
   * 判断请求是否成功
   *
   * - `boolean` 直接成功或失败
   * - `(json: any) => boolean` 根据原始 json 对象进行自定义判断
   */
  isSuccess?: TIsSuccess;
  /**
   * 提取最终需要的数据，默认 `json.data`
   *
   * - `string` 自定义数据字段，如 `'DATA'` 则表示获取 `json.DATA`
   * - `(json: any) => any` 从原始 json 对象进行自定义提取
   */
  getData?: TGetData;
  /**
   * 当 `isSuccess()` 判定为失败时，从数据中提取错误 code，默认 `json.code`
   *
   * - `string` 自定义数据字段，如 `'CODE'` 则表示获取 `json.CODE`
   * - `(json: any) => any` 从原始 json 对象进行自定义提取
   */
  getCode?: TGetString;
  /**
   * 当 `isSuccess()` 判定为失败时，从数据中提取错误 title，默认 `json.title`
   *
   * - `string` 自定义数据字段，如 `'TITLE'` 则表示获取 `json.TITLE`
   * - `(json: any) => string` 从原始 json 对象进行自定义提取
   */
  getTitle?: TGetString;
  /**
   * 当 `isSuccess()` 判定为失败时，从数据中提取错误 message，默认 `json.message`
   *
   * - `string` 自定义数据字段，如 `'MESSAGE'` 则表示获取 `json.MESSAGE`
   * - `(json: any) => string` 从原始 json 对象进行自定义提取
   */
  getMessage?: TGetString;
}

/**
 * 可以在引入此拦截器的时候给定默认的判断和取数据的方法
 */
export interface IFetcherInterceptBizOptions extends IFetcherConfigAugment {}
