import getMimeTypeFromBase64Data from './get-mime-type-from-base64-data';

/**
 * 将 `data:image/jpeg;base64,/...` 转成 Blob
 */
export default function base64ToBlob(dataUrl: string): Blob {
  const match = dataUrl.match(/^data:(.+?);base64,(.*)/) as [string, string, string] | null;
  let mime = '';
  let data = dataUrl;
  
  if (match) {
    mime = match[1];
    data = match[2];
  }
  
  const raw = atob(data);
  const rawLength = raw.length;
  const uint8Array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; ++i) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([uint8Array], {
    type: mime || getMimeTypeFromBase64Data(uint8Array)
  });
}
