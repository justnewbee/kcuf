import {
  Fetcher,
  FetcherHeaders
} from '@kcuf/fetcher-core';

export default function interceptHeaders(fetcher: Fetcher, headers: FetcherHeaders | (() => FetcherHeaders), priority?: number): () => void {
  return fetcher.interceptRequest(() => ({
    headers: typeof headers === 'function' ? headers() : headers
  }), priority);
}
