import {
  FetcherConfig
} from '@kcuf/fetcher-core';

export default function getDuration(config: FetcherConfig): number {
  return config._timeStarted ? Date.now() - config._timeStarted : -1;
}
