import {
  RuleSet
} from 'styled-components';

import {
  ButtonPreset
} from '@kcuf-ui/rc-button-headless';
import {
  mixinButtonDefault,
  mixinButtonDefaultStateNormal,
  mixinButtonDefaultStateActive,
  
  mixinButtonSecondary,
  mixinButtonSecondaryStateNormal,
  mixinButtonSecondaryStateActive,
  
  mixinButtonPrimary,
  mixinButtonPrimaryStateNormal,
  mixinButtonPrimaryStateActive,
  
  mixinButtonTertiary,
  mixinButtonTertiaryStateNormal,
  mixinButtonTertiaryStateActive,
  
  mixinButtonDanger,
  mixinButtonDangerStateNormal,
  mixinButtonDangerStateActive,
  
  mixinButtonTextPrimary,
  mixinButtonTextPrimaryStateNormal,
  mixinButtonTextPrimaryStateActive,
  
  mixinButtonText,
  mixinButtonTextStateNormal,
  mixinButtonTextStateActive
} from '@kcuf/fork-console-base-theme';

import {
  IScButtonProps
} from '../types';

const MAPPING_NORMAL: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DEFAULT]: mixinButtonDefaultStateNormal,
  [ButtonPreset.PRIMARY]: mixinButtonPrimaryStateNormal,
  [ButtonPreset.SECONDARY]: mixinButtonSecondaryStateNormal,
  [ButtonPreset.TERTIARY]: mixinButtonTertiaryStateNormal,
  [ButtonPreset.DANGER]: mixinButtonDangerStateNormal,
  [ButtonPreset.LINK]: mixinButtonTextPrimaryStateNormal,
  [ButtonPreset.TEXT]: mixinButtonTextStateNormal
};

const MAPPING_ACTIVE: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DEFAULT]: mixinButtonDefaultStateActive,
  [ButtonPreset.PRIMARY]: mixinButtonPrimaryStateActive,
  [ButtonPreset.SECONDARY]: mixinButtonSecondaryStateActive,
  [ButtonPreset.TERTIARY]: mixinButtonTertiaryStateActive,
  [ButtonPreset.DANGER]: mixinButtonDangerStateActive,
  [ButtonPreset.LINK]: mixinButtonTextPrimaryStateActive,
  [ButtonPreset.TEXT]: mixinButtonTextStateActive
};

const MAPPING: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DEFAULT]: mixinButtonDefault,
  [ButtonPreset.PRIMARY]: mixinButtonPrimary,
  [ButtonPreset.SECONDARY]: mixinButtonSecondary,
  [ButtonPreset.TERTIARY]: mixinButtonTertiary,
  [ButtonPreset.DANGER]: mixinButtonDanger,
  [ButtonPreset.LINK]: mixinButtonTextPrimary,
  [ButtonPreset.TEXT]: mixinButtonText
};

export default function cssButtonPreset(props: IScButtonProps): RuleSet | null {
  if (props.$active) {
    return props.$preset ? MAPPING_ACTIVE[props.$preset] : null;
  }
  
  if (props['data-loading'] !== undefined) { // loading 的时候没有 hover 样式
    return props.$preset ? MAPPING_NORMAL[props.$preset] : null;
  }
  
  return props.$preset ? MAPPING[props.$preset] : null;
}
