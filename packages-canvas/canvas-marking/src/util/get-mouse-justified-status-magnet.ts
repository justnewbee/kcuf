import {
  JustifyMagnetOrder,
  JustifyMagnetResult
} from '@kcuf/geometry-basic';

import {
  EMouseJustifyStatus
} from '../enum';

export default function getMouseJustifiedStatusMagnet(result: JustifyMagnetResult): EMouseJustifyStatus {
  switch (result.order) {
    case JustifyMagnetOrder.VERTEX:
      return EMouseJustifyStatus.MAGNET_VERTEX;
    case JustifyMagnetOrder.INTERSECTION:
      return EMouseJustifyStatus.MAGNET_INTERSECTION;
    case JustifyMagnetOrder.MID:
      return EMouseJustifyStatus.MAGNET_MID;
    default:
      return EMouseJustifyStatus.MAGNET_BORDER;
  }
}