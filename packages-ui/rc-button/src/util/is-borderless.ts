import {
  ButtonPreset,
  ButtonSize
} from '@kcuf-ui/rc-button-headless';

import {
  IScButtonProps
} from '../types';

const THEMES_NEED_BORDER: ButtonPreset[] = [
  ButtonPreset.DANGER,
  ButtonPreset.PRIMARY,
  ButtonPreset.DEFAULT,
  ButtonPreset.TERTIARY,
  ButtonPreset.SECONDARY
];

export default function isBorderless(props: IScButtonProps): boolean {
  return props.$size === ButtonSize.NONE || (props.$preset ? !THEMES_NEED_BORDER.includes(props.$preset as ButtonPreset) : true);
}
