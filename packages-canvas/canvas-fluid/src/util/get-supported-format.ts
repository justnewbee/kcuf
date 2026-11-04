import {
  ITextureFormat
} from '../types';

import supportRenderTextureFormat from './support-render-texture-format';

/**
 * Half float render targets are not guaranteed to be supported, so the format is
 * walked down from a single channel to RGBA until one of them is renderable.
 */
export default function getSupportedFormat(gl: WebGL2RenderingContext, internalFormat: number, format: number, type: number): ITextureFormat | null {
  if (supportRenderTextureFormat(gl, internalFormat, format, type)) {
    return {
      internalFormat,
      format
    };
  }
  
  if (!('drawBuffers' in gl)) {
    return null;
  }
  
  if (internalFormat === gl.R16F) {
    return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
  }
  
  if (internalFormat === gl.RG16F) {
    return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
  }
  
  return null;
}
