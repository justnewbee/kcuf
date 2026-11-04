import {
  TUniforms
} from '../types';
import {
  createProgram,
  getUniforms
} from '../util';

/**
 * A linked program, plus the locations of all of its active uniforms.
 */
export default class Program {
  private readonly program: WebGLProgram;
  readonly uniforms: TUniforms;
  
  constructor(private readonly gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.program = createProgram(gl, vertexShader, fragmentShader);
    this.uniforms = getUniforms(gl, this.program);
  }
  
  bind(): void {
    this.gl.useProgram(this.program);
  }
}
