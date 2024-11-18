import {
  ReactElement,
  isValidElement
} from 'react';

export default function renderIcon(icon?: ' ' | ReactElement): ReactElement | string | null {
  if (!icon) {
    return null;
  }
  
  if (icon === ' ') {
    return ' ';
  }
  
  if (isValidElement(icon)) {
    return icon;
  }
  
  return null;
}
