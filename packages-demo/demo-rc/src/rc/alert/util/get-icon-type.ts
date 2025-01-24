import {
  IconType
} from '../../icon';
import {
  TAlertType
} from '../types';

export default function getIconType(type: TAlertType): IconType {
  switch (type) {
  case 'help':
    return 'help';
  case 'info':
    return 'info';
  case 'success':
    return 'success';
  case 'warn':
    return 'warn';
  case 'error':
    return 'error';
  default:
    return 'info';
  }
}
