import {
  IDoubleFramebuffer
} from '../types';

import createFramebuffer from './create-framebuffer';

export default function createDoubleFramebuffer(gl: WebGL2RenderingContext, width: number, height: number, internalFormat: number, format: number, type: number, filtering: number): IDoubleFramebuffer {
  const read = createFramebuffer(gl, width, height, internalFormat, format, type, filtering);
  const write = createFramebuffer(gl, width, height, internalFormat, format, type, filtering);
  
  return {
    width,
    height,
    texelSizeX: read.texelSizeX,
    texelSizeY: read.texelSizeY,
    read,
    write,
    swap(): void {
      const next = this.read;
      
      this.read = this.write;
      this.write = next;
    }
  };
}
