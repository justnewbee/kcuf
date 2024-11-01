import {
  FetcherErrorName,
  FetcherError
} from '@kcuf/fetcher';

import {
  TNeedLogin
} from '../types';

export default function shouldDoLogin(error: FetcherError, needLogin: TNeedLogin): boolean {
  return error.name === FetcherErrorName.BIZ && error.code ? needLogin(error.code) : false;
}
