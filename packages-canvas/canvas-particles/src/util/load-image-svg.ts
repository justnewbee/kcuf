export default function loadImageSvg(url: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    fetch(url, {
      credentials: 'omit'
    }).then(response => response.blob()).then(blob => {
      const img = new Image();
      
      img.addEventListener('load', () => {
        resolve(img);
      });
      img.src = URL.createObjectURL(blob);
    }, () => reject(new Error('Cannot load svg')));
  });
}