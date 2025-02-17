import {
  JustifyMagnetType,
  JustifyMagnetResult
} from '@kcuf/geometry-basic';

import {
  EMouseJustifyStatus
} from '../enum';

export default function getMouseJustifyStatusMagnet(result: JustifyMagnetResult): EMouseJustifyStatus {
  switch (result.type) {
  case JustifyMagnetType.VERTEX:
    return EMouseJustifyStatus.MAGNET_VERTEX;
  case JustifyMagnetType.INTERSECTION:
    return EMouseJustifyStatus.MAGNET_INTERSECTION;
  case JustifyMagnetType.MID:
    return EMouseJustifyStatus.MAGNET_MID;
  default:
    return EMouseJustifyStatus.MAGNET_BORDER;
  }
}
