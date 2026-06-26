import {
  IFetcherResponse
} from '../types';

export default function getFilenameFromResponseHeaders(fetcherResponse?: IFetcherResponse): string {
  // attachment;filename=...
  const disposition = fetcherResponse?.headers.get('Content-Disposition');
  const matches = disposition?.match(/attachment;filename=([^;\n]+)/);
  
  return decodeURIComponent(matches?.[1] || '') || 'download';
}
