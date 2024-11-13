import fetcherFetch from '@kcuf/fetcher-fetch';

export default function sender(trackUrl: string, body: string, headers: Record<string, string>): void {
  fetcherFetch(trackUrl, {
    method: 'POST',
    // SLS 如果要启用 web log，必须 CORS，但不允许带 cookie，所以不可用 `include`，否则会报错：
    // 「Credential is not supported if the CORS header ‘Access-Control-Allow-Origin’ is ‘*’」
    credentials: 'omit',
    timeout: 2500,
    headers,
    body
  }).catch(() => {
    // ignore
  });
}
