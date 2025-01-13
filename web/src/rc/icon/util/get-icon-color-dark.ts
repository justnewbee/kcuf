import {
  TIconType
} from '../types';

export default function getIconColorDark(type: TIconType): string | null {
  switch (type) { // TODO use theme package for hardcoded colors
  case 'github':
    return '#fff';
  default:
    return null;
  }
}
