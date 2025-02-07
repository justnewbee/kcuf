import {
  IIconPropsGeneric
} from '../types';

export default function getIconFontSize(size: IIconPropsGeneric['size'], relative?: boolean): string | undefined {
  switch (size) {
  case 'xs':
    return relative ? '0.9em' : '12px';
  case 's':
    return relative ? '1.2em' : '14px';
  case 'm':
    return relative ? '1.4em' : '16px';
  case 'l':
    return relative ? '2em' : '24px';
  case 'xl':
    return relative ? '3.2em' : '32px';
  default:
    return undefined;
  }
}
