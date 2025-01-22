import {
  RuleSet
} from 'styled-components';

import {
  mixinButtonSizeXs,
  mixinButtonSizeS,
  mixinButtonSizeM,
  mixinButtonSizeL,
  mixinButtonSizeXl
} from '@kcuf/fork-console-base-theme';
import {
  ButtonSize,
  ButtonPreset
} from '@kcuf-ui/rc-button-headless';

import {
  IScButtonProps
} from '../types';

const MAPPING: Record<ButtonSize, RuleSet | null> = {
  [ButtonSize.NONE]: null,
  [ButtonSize.XS]: mixinButtonSizeXs,
  [ButtonSize.S]: mixinButtonSizeS,
  [ButtonSize.M]: mixinButtonSizeM,
  [ButtonSize.L]: mixinButtonSizeL,
  [ButtonSize.XL]: mixinButtonSizeXl
};

const THEMES_DEFAULT_SIZE_NONE = [
  ButtonPreset.NONE,
  ButtonPreset.LINK,
  ButtonPreset.TEXT
];

export default function cssButtonSize(props: IScButtonProps): RuleSet | null {
  if (props.$size) {
    return MAPPING[props.$size];
  }
  
  return MAPPING[props.$preset && THEMES_DEFAULT_SIZE_NONE.includes(props.$preset as ButtonPreset) ? ButtonSize.NONE : ButtonSize.M];
}
