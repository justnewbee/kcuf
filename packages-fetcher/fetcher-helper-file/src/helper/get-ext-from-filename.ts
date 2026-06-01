export default function getExtFromFilename(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  
  if (lastDot === -1) {
    return '';
  }
  
  return filename.slice(lastDot).toLowerCase();
}
