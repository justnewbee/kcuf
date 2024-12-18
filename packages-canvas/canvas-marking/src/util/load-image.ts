/**
 *  加载图片
 */
export default function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img);
    };
    
    img.onerror = e => {
      reject(e);
    };
    
    img.src = src;
  });
}