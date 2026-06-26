import {
  createFetcher
} from './util';

const fetcher = createFetcher();

fetcher.sealInterceptors();

export default fetcher;

export * from '@kcuf/fetcher-core';

export {
  createFetcher
};
