import {
  IScIconProps
} from '../types';

export default function getIconColor(props: IScIconProps): string {
  if (!props.$colored) {
    return 'inherit';
  }
  
  switch (props.$type) { // TODO use theme package for hardcoded colors
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
    default:
      return 'inherit';
  }
}