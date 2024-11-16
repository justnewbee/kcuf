import {
  ButtonIconSpacing
} from '@kcuf/rc-headless-button';

export default function getStyleIconSpacing(iconSpacing?: ButtonIconSpacing): number {
  switch (iconSpacing) {
  case 'no':
    return 0;
  case 'small':
    return 4;
  default:
    return 8;
  }
}
