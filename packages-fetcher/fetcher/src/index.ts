import createFetcher from './create-fetcher';

const fetcher = createFetcher();

fetcher.sealInterceptors();

export default fetcher;

export * from '@kcuf/fetcher-core';

export {
  createFetcher
};
