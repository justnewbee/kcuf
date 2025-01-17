import {
  ButtonPreset
} from '@kcuf-ui/rc-button-headless';

import {
  IScButtonProps
} from '../types';

const THEMES_BLOCK: ButtonPreset[] = [
  ButtonPreset.MENU
];

export default function isFluid(props: IScButtonProps): boolean | undefined {
  return (props.$preset && THEMES_BLOCK.includes(props.$preset as ButtonPreset)) || props.$fluid;
}
