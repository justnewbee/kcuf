import getDocument from './get-document';

export default async function exitFullscreen(): Promise<void> {
  const doc = getDocument();
  
  if (doc.exitFullscreen) {
    return doc.exitFullscreen();
  }
  
  if (doc.msExitFullscreen) {
    return doc.msExitFullscreen();
  }
  
  if (doc.webkitExitFullscreen) {
    return doc.webkitExitFullscreen();
  }
  
  if (doc.mozCancelFullScreen) {
    return doc.mozCancelFullScreen();
  }
}
