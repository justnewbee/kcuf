export default function parseFilenameFromResponseHeaders(headers?: Headers): string {
  // attachment;filename=...
  const disposition = headers?.get('Content-Disposition');
  const matches = disposition?.match(/attachment;filename=([^;\n]+)/);
  
  return decodeURIComponent(matches?.[1] || '');
}
