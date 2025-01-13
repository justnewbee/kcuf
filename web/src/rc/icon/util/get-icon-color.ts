import {
  TIconType
} from '../types';

export default function getIconColor(type: TIconType): string | null {
  switch (type) { // TODO use theme package for hardcoded colors
  case 'github':
    return '#111';
  case 'npm':
    return '#c12127';
  default:
    return null;
  }
}
