import {
  FetcherErrorName
} from '@kcuf/fetcher-core';
import {
  FetchErrorName
} from '@kcuf/fetcher-fetch';
import {
  XhrErrorName
} from '@kcuf/fetcher-xhr';
import {
  JsonpErrorName
} from '@kcuf/fetcher-jsonp';

export default function normalizeErrorName(errorName: string): FetcherErrorName | undefined {
  switch (errorName as FetchErrorName | XhrErrorName | JsonpErrorName) {
  case FetchErrorName.NETWORK:
  case XhrErrorName.NETWORK:
  case JsonpErrorName.NETWORK:
    return FetcherErrorName.NETWORK;
  case FetchErrorName.TIMEOUT:
  case XhrErrorName.TIMEOUT:
  case JsonpErrorName.TIMEOUT:
    return FetcherErrorName.TIMEOUT;
  default:
    break;
  }
}
