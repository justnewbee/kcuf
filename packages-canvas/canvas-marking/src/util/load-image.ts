/**
 *  加载图片
 */
export default function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = (): void => {
      resolve(img);
    };
    
    img.onerror = e => {
      reject(new Error(typeof e === 'string' ? e : `failed to load image with src ${src}`));
    };
    
    img.src = src;
  });
}
