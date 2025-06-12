import getPixelRatio from './get-pixel-ratio';

// https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
const mediaQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);

export default function listenPixelRatioChange(listener: (pixelRatio: number) => void): () => void {
  const callback = (): void => listener(getPixelRatio());
  
  mediaQuery.addEventListener('change', callback);
  
  return () => mediaQuery.removeEventListener('change', callback);
}
