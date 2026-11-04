/**
 * Resolves the grid size that keeps the given resolution on the short side.
 */
export default function getResolution(gl: WebGL2RenderingContext, resolution: number): {
  width: number;
  height: number;
} {
  const aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
  const shortSide = Math.round(resolution);
  const longSide = Math.round(resolution * (aspectRatio < 1 ? 1 / aspectRatio : aspectRatio));
  
  return gl.drawingBufferWidth > gl.drawingBufferHeight ? {
    width: longSide,
    height: shortSide
  } : {
    width: shortSide,
    height: longSide
  };
}
