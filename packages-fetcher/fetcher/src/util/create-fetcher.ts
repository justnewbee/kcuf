import factory from '@kcuf/fetcher-core';

import fetchX from './fetch-x';
import normalizeErrorName from './normalize-error-name';

export default factory(fetchX, normalizeErrorName);
