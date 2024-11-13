import {
  TVector
} from '../../types';

/**
 * 向量 vector 旋转 theta 角（弧度值）得到新的向量 vector
 *
 *  ◉━━━━━━━◉ vector
 *   ╲ ↙ +θ
 *    ╲
 *     ◉
 *    vector'
 */
export default function rotateVector(vector: TVector, theta: number): TVector {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  
  return [ // 旋转矩阵乘法
    vector[0] * cosTheta - vector[1] * sinTheta,
    vector[0] * sinTheta + vector[1] * cosTheta
  ];
}
