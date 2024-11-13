export default function createMarkingCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  
  canvas.style.position = 'absolute';
  
  return canvas;
}
