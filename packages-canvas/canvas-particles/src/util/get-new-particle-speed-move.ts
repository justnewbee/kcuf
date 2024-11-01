import {
  IParticlesParsedConfig
} from '../types';

import randomN from './random-n';

export default function getNewParticleSpeedMove(animateMove: IParticlesParsedConfig['animateMove']): [number, number] {
  if (!animateMove) {
    return [0, 0];
  }
  
  const {
    speed,
    speedSync
  } = animateMove;
  
  // 给速度向量长度一个变数
  const speedValue = speed * (speedSync ? 1 : randomN(100, 30) / 100);
  const radian = (animateMove.angle === 'random' ? randomN(360) : animateMove.angle) * Math.PI / 180;
  let vx = Math.cos(radian);
  let vy = Math.sin(radian);
  
  // 增加速度角度的变数
  if (!animateMove.straight) {
    vx += Math.random() - 0.5;
    vy += Math.random() - 0.5;
  }
  
  return [speedValue * vx, speedValue * vy];
}