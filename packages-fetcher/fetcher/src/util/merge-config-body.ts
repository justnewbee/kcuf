import {
  IFetcherConfig,
  TFetcherBody
} from '../types';

import mergeParams from './merge-params';

export default function mergeConfigParams(config: IFetcherConfig, body?: TFetcherBody): void {
  if (body) {
    config.body = mergeParams([config.body, body]);
  }
}