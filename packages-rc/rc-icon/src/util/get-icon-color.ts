import {
  TIconType
} from '../types';

export default function getIconColor(type: TIconType): string | null {
  switch (type) { // TODO use theme package for hardcoded colors
  case 'help':
  case 'help-fill':
    return '#888';
  case 'info':
  case 'info-fill':
    return '#0064c8';
  case 'warn':
  case 'warn-fill':
    return '#ffc440';
  case 'success':
  case 'success-fill':
    return '#1e8e3e';
  case 'error':
  case 'error-fill':
    return '#d93026';
  case 'avatar':
    return '#ccc';
  default:
    return null;
  }
}
