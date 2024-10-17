import {
  IFetcherConfig,
  TFetcherParams
} from '../types';

import mergeParams from './merge-params';

export default function mergeConfigParams(config: IFetcherConfig, params?: TFetcherParams): void {
  if (params) {
    config.params = mergeParams([config.params, params]);
  }
}
