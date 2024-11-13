import {
  IFetcherConfigAugment
} from './fetcher-config';

declare module '@kcuf/fetcher' {
  interface FetcherConfig extends IFetcherConfigAugment {}
}
