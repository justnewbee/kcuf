import createError from './create-error';

export default function createErrorAbort(url: string): Error {
  return createError('AbortError', `Jsonp aborted, url = ${url}`);
}
