import {
  FetchErrorName
} from '@kcuf/fetcher-fetch';
import {
  JsonpErrorName
} from '@kcuf/fetcher-jsonp';
import {
  XhrErrorName
} from '@kcuf/fetcher-xhr';
import {
  FetcherErrorName
} from '@kcuf/fetcher-core';

export default function normalizeErrorName(errorName: string): FetcherErrorName | undefined {
  switch (errorName as FetchErrorName | JsonpErrorName | XhrErrorName) {
  case FetchErrorName.NETWORK:
  case JsonpErrorName.NETWORK:
  case XhrErrorName.NETWORK:
    return FetcherErrorName.NETWORK;
  case FetchErrorName.TIMEOUT:
  case JsonpErrorName.TIMEOUT:
  case XhrErrorName.TIMEOUT:
    return FetcherErrorName.TIMEOUT;
  default:
    break;
  }
}
