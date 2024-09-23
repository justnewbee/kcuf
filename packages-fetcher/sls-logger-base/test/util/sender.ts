export default function sender(trackUrl: string, body: string, headers: Record<string, string>): void {
  fetch(trackUrl, {
    method: 'POST',
    credentials: 'omit',
    headers,
    body
  }).catch(() => {
    // ignore error
  });
}