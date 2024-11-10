import {
  RuleSet
} from 'styled-components';

import {
  mixinButtonSizeXs,
  mixinButtonSizeS,
  mixinButtonSizeM,
  mixinButtonSizeL,
  mixinButtonSizeXl
} from '@alicloud/console-base-theme';

import {
  EButtonSize,
  EButtonPreset
} from '../../model';
import {
  IScButtonProps
} from '../types';

const MAPPING: Record<EButtonSize, RuleSet | null> = {
  [EButtonSize.NONE]: null,
  [EButtonSize.XS]: mixinButtonSizeXs,
  [EButtonSize.S]: mixinButtonSizeS,
  [EButtonSize.M]: mixinButtonSizeM,
  [EButtonSize.L]: mixinButtonSizeL,
  [EButtonSize.XL]: mixinButtonSizeXl
};

const THEMES_DEFAULT_SIZE_NONE = [
  EButtonPreset.NONE,
  EButtonPreset.TEXT_PRIMARY,
  EButtonPreset.TEXT_SECONDARY,
  EButtonPreset.TEXT_TERTIARY,
  EButtonPreset.TEXT_BRAND_PRIMARY,
  EButtonPreset.TEXT_BRAND_SECONDARY
];

export default function cssButtonSize(props: IScButtonProps): RuleSet | null {
  if (props.$size) {
    return MAPPING[props.$size];
  }
  
  return MAPPING[props.$preset && THEMES_DEFAULT_SIZE_NONE.includes(props.$preset) ? EButtonSize.NONE : EButtonSize.M];
}
