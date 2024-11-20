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
  case EImageType.NONE:
    return MARKING_ITEMS_NO_IMAGE;
  case EImageType.ARIAL:
    return MARKING_ITEMS_AERIAL;
  default:
    return MARKING_ITEMS_RANDOM;
  }
}
