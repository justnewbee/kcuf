import {
  TIconType
} from '../types';

export default function getIconColor(type: TIconType): string | null {
  switch (type) { // TODO use theme package for hardcoded colors
  case 'loading':
    return '#aaa';
  case 'help':
  case 'help-fill':
    return '#999';
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
  case 'avatar-fill':
    return '#ccc';
  default:
    return null;
  }
}
