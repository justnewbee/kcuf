export default function getImageFitScale(stage: HTMLDivElement, imageLoader: HTMLImageElement): number {
  const rect = stage.getBoundingClientRect();
  const imageScaleW = rect.width / imageLoader.naturalWidth;
  const imageScaleH = rect.height / imageLoader.naturalHeight;
  
  // 容器能完整放下
  if (imageScaleW >= 1 && imageScaleH >= 1) {
    return 1;
  }
  
  // 宽比大于高比，则定高，宽度自适应；否则定宽，高度自适应
  return imageScaleW > imageScaleH ? imageScaleH : imageScaleW;
}
