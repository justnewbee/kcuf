import {
  RuleSet
} from 'styled-components';

import {
  mixinButtonShadow
} from '@alicloud/console-base-theme';

import {
  EButtonPreset,
} from '../../model';
import {
  IScButtonProps
} from '../types';

const THEMES_NEED_SHADOW: EButtonPreset[] = [
  EButtonPreset.DANGER,
  EButtonPreset.PRIMARY,
  EButtonPreset.SECONDARY,
  EButtonPreset.SECONDARY_ALT,
  EButtonPreset.BRAND_PRIMARY,
  EButtonPreset.BRAND_SECONDARY,
  EButtonPreset.BRAND_SECONDARY_ALT
];

export default function cssButtonShadow(props: IScButtonProps): RuleSet | null {
  if (props.disabled || props.$noShadow || props.$loading || props.$active) {
    return null;
  }
  
  if (props.$preset && THEMES_NEED_SHADOW.includes(props.$preset as EButtonPreset)) {
    return mixinButtonShadow;
  }
  
  return null;
}
