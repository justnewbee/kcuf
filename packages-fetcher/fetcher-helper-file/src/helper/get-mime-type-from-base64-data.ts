const HEADER_MIME_MAP: Record<string, string> = {
  '89504E470D0A1A0A': 'image/png',
  474946383761: 'image/gif',
  FFD8FF: 'image/jpeg',
  '255044462D312E': 'application/pdf'
};

/**
 * 不带 data 头的纯 Base64，可以从数据头中提取
 */
export default function getMimeTypeFromBase64Data(uInt8Array: Uint8Array): string {
  const headerString = Array.from(uInt8Array.slice(0, 8)).map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
  
  return HEADER_MIME_MAP[headerString] || '';
}
