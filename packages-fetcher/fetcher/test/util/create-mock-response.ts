import {
  IMockApi
} from '../types';

export default function createMockResponse(mockApi: IMockApi): () => unknown {
  return () => mockApi.timeout ? new Promise(resolve => {
    setTimeout(() => resolve(mockApi.result), mockApi.timeout);
  }) : mockApi.result;
}
