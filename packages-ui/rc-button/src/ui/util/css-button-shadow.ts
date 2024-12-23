import {
  RuleSet
} from 'styled-components';

import {
  mixinButtonShadow
} from '@kcuf/fork-console-base-theme';
import {
  ButtonPreset
} from '@kcuf-ui/rc-button-headless';

import {
  IScButtonProps
} from '../types';

const THEMES_NEED_SHADOW: ButtonPreset[] = [
  ButtonPreset.DANGER,
  ButtonPreset.PRIMARY,
  ButtonPreset.SECONDARY,
  ButtonPreset.SECONDARY_ALT,
  ButtonPreset.BRAND_PRIMARY,
  ButtonPreset.BRAND_SECONDARY,
  ButtonPreset.BRAND_SECONDARY_ALT
];

export default function cssButtonShadow(props: IScButtonProps): RuleSet | null {
  if (props.disabled || props.$noShadow || props.$loading || props.$active) {
    return null;
  }
  
  if (props.$preset && THEMES_NEED_SHADOW.includes(props.$preset as ButtonPreset)) {
    return mixinButtonShadow;
  }
  
  return null;
}
