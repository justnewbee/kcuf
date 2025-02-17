import {
  TAngle,
  TVector
} from '../../types';
import {
  normalizeVector,
  segmentVectorNormalized
} from '../base';
import {
  rotateVector
} from '../transform';

/**
 * 角等分线向量（pointMid + 此向量 → 一条射线）
 */
export default function angleBisector(angle: TAngle): TVector {
  const v1 = segmentVectorNormalized([angle[1], angle[0]]);
  const v2 = segmentVectorNormalized([angle[1], angle[2]]);
  const vxSum = v1[0] + v2[0];
  const vySum = v1[1] + v2[1];
  
  // 此时角为平角，三点一线，返回 `pointMid→pointStart` 的单位向量旋转 90° 得到的值
  if (!vxSum && !vySum) {
    return rotateVector(v1, Math.PI / 2);
  }
  
  return normalizeVector([vxSum, vySum]);
}
