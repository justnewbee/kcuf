import fetchMock from 'fetch-mock';

import {
  SlsPostBody
} from '@kcuf/sls-logger-web';

export default function getLastCallBody(): SlsPostBody {
  return JSON.parse(fetchMock.callHistory.lastCall()?.options.body as string || '');
}
