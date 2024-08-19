import {
  IUpdateInfo
} from './common';

export interface IParticleClassType {
  update(info: IUpdateInfo): void;
  
  bounceAnother(p: IParticleClassType): void;
  
  attractAnother(p: IParticleClassType): void;
  
  draw(): void;
}