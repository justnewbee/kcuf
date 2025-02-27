import {
  MarkingConfigItem
} from '@kcuf/canvas-marking-react-headless';

import {
  EDataType
} from '../enum';
import {
  MARKING_ITEMS_AERIAL,
  MARKING_ITEMS_RANDOM,
  MARKING_ITEMS_NO_IMAGE
} from '../const';

export default function getDataMarkings(type: EDataType): MarkingConfigItem[] {
  switch (type) {
  case EDataType.ARIAL:
    return MARKING_ITEMS_AERIAL;
  case EDataType.RANDOM:
    return MARKING_ITEMS_RANDOM;
  case EDataType.NO_IMAGE:
    return MARKING_ITEMS_NO_IMAGE;
  default:
    return [];
  }
}
