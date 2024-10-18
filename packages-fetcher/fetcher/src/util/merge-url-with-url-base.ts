import getProtocolAndHost from './get-protocol-and-host';

export default function mergeUrlWithUrlBase(url: string, urlBase?: string): string {
  return !urlBase || getProtocolAndHost(url) ? url : `${urlBase}${url}`;
}