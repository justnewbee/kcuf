import fetchMock from 'fetch-mock';

export default function setupFetchMock(): void {
  fetchMock.clearHistory();
  fetchMock.removeRoutes();
  fetchMock.mockGlobal();
  
  fetchMock.route('*', 200);
}
