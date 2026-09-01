import factory from '@kcuf/fetcher-core';
import fetcherTransportWeb, {
  normalizeErrorName
} from '@kcuf/fetcher-transport-web';

export default factory(fetcherTransportWeb, normalizeErrorName);
