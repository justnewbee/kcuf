import {
  ButtonPreset
} from '@kcuf/rc-button-headless';

import {
  IScButtonProps
} from '../types';

const THEMES_BLOCK: ButtonPreset[] = [
  ButtonPreset.MENU
];

export default function isBlock(props: IScButtonProps): boolean | undefined {
  return (props.$preset && THEMES_BLOCK.includes(props.$preset as ButtonPreset)) || props.$block;
}
