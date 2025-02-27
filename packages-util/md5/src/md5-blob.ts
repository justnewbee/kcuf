import md5Buffer from './md5-buffer';

export default function md5Blob(blob: Blob): Promise<string> {
  return blob.arrayBuffer().then(md5Buffer);
}
