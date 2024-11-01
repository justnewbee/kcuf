import loadImageSvg from './load-image-svg';
import loadImageBitmap from './load-image-bitmap';

export default function loadImage(src: string): Promise<HTMLImageElement> {
  return /\.svg$/.test(src) ? loadImageSvg(src) : loadImageBitmap(src);
}