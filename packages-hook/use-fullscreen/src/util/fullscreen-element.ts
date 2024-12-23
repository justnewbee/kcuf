import getDocument from './get-document';

export default function fullscreenElement(): Element | null {
  const doc = getDocument();
  
  return doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement || null;
}
