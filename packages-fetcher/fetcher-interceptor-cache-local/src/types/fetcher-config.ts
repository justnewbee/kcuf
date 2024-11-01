import {
  ICacheLocalOptions
} from './options';

export interface IFetcherConfigAugment {
  /**
   * 是否做本地缓存，必须手动指定
   */
  cacheLocal?: null | boolean | ICacheLocalOptions;
  /**
   * 通常执行了某数据的「写」操作后（增、删、改）需要对其已有的本地缓存进行清理，可以在这些写操作中使用此参数，会
   * 在接口执行成功后，将缓存中 key 值带有 cacheLocalRemove 指定串的进行移除
   *
   * 注意可能会误伤友军（不会造成问题），所以，尽可能使用常量或者 URL 本身（因为默认的 key 中是带 URL 的）
   */
  cacheLocalRemove?: string;
}
