import {
  TUniforms
} from '../types';
import {
  hashKeywords,
  createProgram,
  getUniforms,
  compileShader
} from '../util';

/**
 * A fragment shader that is compiled once per keyword combination.
 */
export default class Material {
  private readonly programs: Record<number, WebGLProgram> = {};
  private activeProgram: WebGLProgram | null = null;
  uniforms: TUniforms = {};
  
  constructor(private readonly gl: WebGL2RenderingContext, private readonly vertexShader: WebGLShader, private readonly fragmentShaderSource: string) {}
  
  setKeywords(keywords: string[]): void {
    const hash = hashKeywords(keywords);
    let program = this.programs[hash];
    
    if (!program) {
      const fragmentShader = compileShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
      
      program = createProgram(this.gl, this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    
    if (program === this.activeProgram) {
      return;
    }
    
    this.uniforms = getUniforms(this.gl, program);
    this.activeProgram = program;
  }
  
  bind(): void {
    if (this.activeProgram) {
      this.gl.useProgram(this.activeProgram);
    }
  }
}
