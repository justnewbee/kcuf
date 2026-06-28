import {
  EFetchErrorName
} from '../enum';
import {
  IFetchOptions
} from '../types';

import getFetch from './get-fetch';
import createErrorTimeout from './create-error-timeout';
import createErrorNetwork from './create-error-network';

/**
 * 「几乎」纯生的 fetch，增加 timeout
 *
 * 引自 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 * The fetch specification differs from jQuery.ajax() in two main ways:
 *
 * - The Promise returned from `fetch()` won't reject on HTTP error status even if the response is an HTTP 404 or 500.
 *   Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or
 *   if anything prevented the request from completing.
 * - By default, fetch won't send or receive any cookies from the server, resulting in unauthenticated requests if the
 *   site relies on maintaining a user session (to send cookies, the credentials init option must be set).
 *
 * 引自 https://github.github.io/fetch/
 *
 * fetch options
 *
 * - `method` (String) - HTTP request method. GET (Default), POST, PUT, DELETE
 * - `body` (String, body types) - HTTP request body
 * - `headers` (Object, Headers) - Default: {}
 * - `credentials` (String) - Authentication credentials mode. Default: 'omit'
 *    + 'omit' - Don't include authentication credentials (e.g. cookies) in the request
 *    + 'same-origin' - Include credentials in requests to the same site
 *    + 'include' - Include credentials in requests to all sites
 */
export default function fetcherFetch(url: string, options: IFetchOptions = {}): Promise<Response> {
  const {
    timeout = 0,
    ...fetchOptions
  } = options;
  
  const fetch = getFetch();
  const promise = fetch(url, fetchOptions as RequestInit).catch((err: unknown) => {
    const error = err as Error;
    
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    // https://javascript.info/fetch-abort
    if (error.name === 'AbortError' || error.name === EFetchErrorName.TIMEOUT as string) {
      throw error;
    }
    
    // URL 不存在或者请求过程被中断（例如刷新页面）会发生此类错误
    // TypeError: NetworkError when attempting to fetch resource.
    throw createErrorNetwork(url, error.message);
  });
  
  return timeout > 0 ? new Promise<Response>((resolve, reject) => {
    const theTimer = setTimeout(() => {
      reject(createErrorTimeout(url, timeout));
    }, timeout);
    
    promise.then((response: Response) => {
      clearTimeout(theTimer);
      resolve(response);
    }, (err: unknown) => {
      clearTimeout(theTimer);
      reject(err as Error); // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion
    });
  }) : promise;
}
