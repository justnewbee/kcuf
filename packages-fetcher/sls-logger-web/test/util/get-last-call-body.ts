import fetchMock from 'fetch-mock';

import {
  SlsPostBody
} from '../../src';

export default function getLastCallBody(): SlsPostBody {
  return JSON.parse(fetchMock.lastCall()?.[1]?.body as string || '');
}