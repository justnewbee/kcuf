import fetchMock from 'fetch-mock';

export default function setupFetchMock(): void {
  fetchMock.reset();
  
  fetchMock.mock('*', 200);
}