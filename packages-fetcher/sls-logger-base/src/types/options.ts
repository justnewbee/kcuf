import {
  TDefaultParams,
  TFlattenPathTester,
  IDontSend
} from './common';

export interface ISlsPipeOptions {
  trackUrl: string;
  /**
   * 不知所谓的参数，但必需，说是保留字段，默认 `0.6.0`（文档中的版本号），请不要使用
   */
  apiVersion: string;
  /**
   * 应用初始化后，多少时间内对日志请求进行冷冻处理，以让行业务请求，提升业务性能
   *
   * 默认 5000ms
   */
  silentTime: number;
  /**
   * 调用方法到日志被真正发送的等待时间，这段时间内，若有新的日志进来，会被合并并重新计时
   *
   * 默认 200ms
   */
  waitTime: number;
  /**
   * 一次最多发送日志条数，若积累的日志数超过，将切成多个请求发送
   *
   * 默认 50
   */
  maxChunk: number;
}

export interface ICreateLoggerOptions extends Partial<ISlsPipeOptions> {
  /**
   * logstore 所在的 SLS project
   */
  project: string;
  /**
   * project 的外网访问域名，在 SLS 控制台 project 概览页可以找到，
   * 如 `cn-hangzhou.log.aliyuncs.com`（仅跟 project 所在地域有关）
   */
  endpoint: string;
  /**
   * SLS project 下的 logstore，必须开通 Web Tracking 功能，日志记录的存储点
   */
  logstore: string;
  /**
   * 当希望同一个模块的日志使用统一的前缀，又不想每次调用的时候写，可以用这个
   */
  prefix?: string;
  /**
   * 生产出的日志方法的整体采样率，可在调用时由方法参数覆盖，范围为 (0, 1]，默认 1
   */
  sampling?: number;
  /**
   * 默认参数，避免每次都要传，可以是静态数据或产生动态数据的方法，这些参数可以覆盖自动记录的参数，
   * 但会被日志方法的第二个参数 `params` 中对应的字段覆盖
   */
  defaultParams?: TDefaultParams;
  /**
   * 上报之前进行判断是否继续，返回 true 以阻止上报
   *
   * 在某些场景下需要禁用日志上报功能，比如可能禁止日志跨境
   */
  dontSend?: IDontSend;
}

/**
 * 生成 `createLogger` 方法的工厂方法的 options，用于制定工厂级别的参数的忽略方法
 */
export interface IGenerateCreateLoggerOptions {
  defaultParams?: TDefaultParams;
  dontSend?: IDontSend;
}

export interface IFlattenOptions {
  scope?: string;
  depth?: number;
  /**
   * 将属性从结果中剔除
   */
  omit?: TFlattenPathTester;
  /**
   * 将属性直接输出，提前结束该属性深度
   */
  direct?: TFlattenPathTester;
}

/**
 * SLS 日志方法 Options
 */
export interface ISlsLogOptions {
  /**
   * 覆盖 IFactoryOptions 的 prefix 设置，仅针对当前日志
   */
  prefix?: string;
  /**
   * 覆盖 IFactoryOptions 的 sampling 设置，仅针对当前日志
   */
  sampling?: number;
  /**
   * 有日志只需要在应用起来后记录一次，后续的将被丢弃
   *
   * - true 表示以该 topic 做判断，针对该 topic 只记录一次
   * - 如果是字符串，则以「topic + 此字符串」做判断
   */
  once?: true | string;
  /**
   * 日志不是强需求，不能压过业务，要业务先行。网络请求一般在页面的一开始最密集，如果日志在这时上报会造成网络阻塞而产生性能问题。
   *
   * 办法是先积压着，等到时间到了，再把积压着的日志一起上报。
   *
   * 所以，为了提升性能，做了以下事情：
   *
   * 1. 应用起来后，有一定的静默时间，这段时间的日志会被积压，用于给应用的请求让路
   * 2. 整体或单个日志的延时时间
   * 3. 整体或单个日志的采样率
   * 4. 有的日志只会发送一次
   * 5. 日志发送前也有一个很短的等待时间，在这段时间内，如果有新的日志进来，也将被积压，并重新计时
   * 6. 最后，积压的日志利用 POST 请求对日志进行合并发送
   *
   * 然而，总有例外，有的日志希望是即时的，比如需要拿它来算 PvUv，instant 就是为此而生。
   * 注意：instant 会忽略延时，但不会忽略采样率
   */
  instant?: boolean;
  /**
   * 是否对 info 进行 flatten 操作
   */
  flatten?: boolean | string | IFlattenOptions;
  /**
   * 为日志增加默认参数 `_GROUP`，可用于数据分析分组
   */
  group?: string;
}

/**
 * SLS 快捷方法 Options
 */
export interface ISlsLogOptionsQuick extends Omit<ISlsLogOptions, 'group'> {}