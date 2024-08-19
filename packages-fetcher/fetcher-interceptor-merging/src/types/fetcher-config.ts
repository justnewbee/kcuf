import {
  IMergingOptions
} from './options';

export interface IFetcherConfigAugment {
  /**
   * 默认，请求在 _id（见 @kcuf/fetcher）相同的情况下，如果同一时间内，有相同 _id 的请求
   */
  merging?: boolean | null | IMergingOptions;
}