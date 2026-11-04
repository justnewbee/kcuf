import {
  ITextureExtensions,
  ICanvasContextOptions
} from '../types';

import getCanvasContext from './get-canvas-context';
import getSupportedFormat from './get-supported-format';

export default function getWebglContext(canvas: HTMLCanvasElement): {
  gl: WebGL2RenderingContext;
  ext: ITextureExtensions;
} | null {
  const attributes: ICanvasContextOptions = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false
  };
  const webgl2 = getCanvasContext(canvas, 'webgl2', attributes);
  const isWebgl2 = webgl2 !== null;
  const gl = webgl2 ?? getCanvasContext(canvas, 'webgl', attributes) ?? getCanvasContext(canvas, 'experimental-webgl', attributes);
  
  if (!gl) {
    return null;
  }
  
  gl.clearColor(0, 0, 0, 1);
  
  let halfFloatTexType: number;
  let supportLinearFiltering: boolean;
  
  if (isWebgl2) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear') !== null;
    halfFloatTexType = gl.HALF_FLOAT;
  } else {
    const halfFloat = gl.getExtension('OES_texture_half_float');
    
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear') !== null;
    halfFloatTexType = halfFloat ? (halfFloat as unknown as { HALF_FLOAT_OES: number; }).HALF_FLOAT_OES : 0;
  }
  
  const formatRgba = isWebgl2 ? getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType) : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  const formatRg = isWebgl2 ? getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType) : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  const formatR = isWebgl2 ? getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType) : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  
  if (!formatRgba || !formatRg || !formatR) {
    return null;
  }
  
  return {
    gl,
    ext: {
      formatRgba,
      formatRg,
      formatR,
      halfFloatTexType,
      supportLinearFiltering
    }
  };
}
