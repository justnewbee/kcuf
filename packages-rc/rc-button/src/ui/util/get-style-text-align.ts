import {
  ButtonPreset
} from '@kcuf/rc-headless-button';

import {
  IScButtonProps
} from '../types';

const THEMES_TEXT_ALIGN_LEFT: ButtonPreset[] = [
  ButtonPreset.MENU
];

export default function getStyleTextAlign(props: IScButtonProps): string {
  if (props.$textAlign) {
    return props.$textAlign;
  }
  
  if (props.$preset && THEMES_TEXT_ALIGN_LEFT.includes(props.$preset as ButtonPreset)) {
    return 'left';
  }
  
  return 'center';
}
