import {
  IParticlesConfig
} from './types';
import {
  Particles
} from './class';

export default function createParticles(canvas: HTMLCanvasElement, config: IParticlesConfig): Particles {
  return new Particles(canvas, config);
}

export type {
  Particles
};

export type {
  IParticlesConfig as ParticlesConfig
} from './types';
