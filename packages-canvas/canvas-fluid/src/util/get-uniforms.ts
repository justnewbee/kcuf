import {
  TUniforms
} from '../types';

export default function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram): TUniforms {
  const uniforms: TUniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  
  for (let i = 0; i < count; i++) {
    const uniform = gl.getActiveUniform(program, i);
    
    if (uniform) {
      uniforms[uniform.name] = gl.getUniformLocation(program, uniform.name);
    }
  }
  
  return uniforms;
}
