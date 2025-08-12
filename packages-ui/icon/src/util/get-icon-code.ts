import {
  TIconType
} from '../types';
import {
  ICON_TYPE_MAPPING
} from '../const';

export default function getIconCode(type: TIconType): string {
  return `\\${ICON_TYPE_MAPPING[type] || 'e600'}`;
}
