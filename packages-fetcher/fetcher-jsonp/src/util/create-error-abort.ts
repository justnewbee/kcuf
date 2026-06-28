import createError from './create-error';

export default function createErrorAbort(url: string): Error {
  return createError('AbortError', `fetcher-jsonp abort, url = ${url}`);
}
