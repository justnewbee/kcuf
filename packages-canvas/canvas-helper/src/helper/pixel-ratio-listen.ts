import pixelRatioGet from './pixel-ratio-get';

const mediaQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);

export default function pixelRatioListen(fn: (pixelRatio: number) => void): () => void {
  const callback = (): void => fn(pixelRatioGet());
  
  mediaQuery.addEventListener('change', callback);
  
  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
}
