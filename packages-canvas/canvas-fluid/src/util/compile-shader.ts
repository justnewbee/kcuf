import addKeywords from './add-keywords';
import traceShaderError from './trace-shader-error';

export default function compileShader(gl: WebGL2RenderingContext, type: number, source: string, keywords: string[] | null = null): WebGLShader {
  const shader = gl.createShader(type);
  
  if (!shader) {
    throw new Error('Unable to create a WebGL shader.');
  }
  
  gl.shaderSource(shader, addKeywords(source, keywords));
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    traceShaderError(gl.getShaderInfoLog(shader));
  }
  
  return shader;
}
