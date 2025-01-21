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
  ButtonPreset.SECONDARY,
  ButtonPreset.SECONDARY_ALT,
  ButtonPreset.TERTIARY,
  ButtonPreset.TERTIARY_ALT,
  ButtonPreset.BRAND_PRIMARY,
  ButtonPreset.BRAND_SECONDARY,
  ButtonPreset.BRAND_SECONDARY_ALT,
  ButtonPreset.BRAND_TERTIARY
];

export default function isBorderless(props: IScButtonProps): boolean {
  return props.$size === ButtonSize.NONE || (props.$preset ? !THEMES_NEED_BORDER.includes(props.$preset as ButtonPreset) : true);
}
