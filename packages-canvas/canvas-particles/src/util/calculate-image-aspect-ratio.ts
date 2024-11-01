export default function calculateImageAspectRatio(image: HTMLImageElement): number {
  const {
    naturalWidth,
    naturalHeight
  } = image;
  
  return naturalWidth && naturalHeight ? naturalWidth / naturalHeight : 1;
}