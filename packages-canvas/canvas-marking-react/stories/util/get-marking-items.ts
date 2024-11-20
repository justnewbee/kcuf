import {
  MarkingConfigItem
} from '@kcuf/canvas-marking';

import {
  EImageType
} from '../enum';
import {
  MARKING_ITEMS_AERIAL,
  MARKING_ITEMS_RANDOM,
  MARKING_ITEMS_NO_IMAGE
} from '../const';

export default function getMarkingItems(type: EImageType): MarkingConfigItem[] {
  switch (type) {
  case EImageType.ARIAL:
    return MARKING_ITEMS_AERIAL;
  case EImageType.RANDOM:
    return MARKING_ITEMS_RANDOM;
  case EImageType.NO_IMAGE:
    return MARKING_ITEMS_NO_IMAGE;
  default:
    return [];
  }
}
