export default function createDomCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  
  canvas.style.position = 'absolute';
  
  return canvas;
}
