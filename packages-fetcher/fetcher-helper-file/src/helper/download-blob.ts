/**
 * 下载 Blob
 */
export default function downloadBlob(blob: Blob, filename = 'download'): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  document.body.appendChild(a);
  
  a.href = url;
  a.download = filename;
  a.click(); // 一般来说，这是安全的，不会被现代浏览器阻止
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
