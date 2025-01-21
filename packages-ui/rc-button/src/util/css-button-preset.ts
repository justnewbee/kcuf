import {
  RuleSet
} from 'styled-components';

import {
  ButtonPreset
} from '@kcuf-ui/rc-button-headless';
import {
  mixinButtonDangerStateNormal,
  mixinButtonPrimaryStateNormal,
  mixinButtonSecondaryStateNormal,
  mixinButtonSecondaryAltStateNormal,
  mixinButtonTertiaryStateNormal,
  mixinButtonTertiaryAltStateNormal,
  mixinButtonBrandPrimaryStateNormal,
  mixinButtonBrandSecondaryStateNormal,
  mixinButtonBrandSecondaryAltStateNormal,
  mixinButtonBrandTertiaryStateNormal,
  mixinButtonTextPrimaryStateNormal,
  mixinButtonTextSecondaryStateNormal,
  mixinButtonTextTertiaryStateNormal,
  mixinButtonTextBrandPrimaryStateNormal,
  mixinButtonTextBrandSecondaryStateNormal,
  mixinButtonDangerStateActive,
  mixinButtonPrimaryStateActive,
  mixinButtonSecondaryStateActive,
  mixinButtonSecondaryAltStateActive,
  mixinButtonTertiaryStateActive,
  mixinButtonTertiaryAltStateActive,
  mixinButtonBrandPrimaryStateActive,
  mixinButtonBrandSecondaryStateActive,
  mixinButtonBrandSecondaryAltStateActive,
  mixinButtonBrandTertiaryStateActive,
  mixinButtonTextPrimaryStateActive,
  mixinButtonTextSecondaryStateActive,
  mixinButtonTextTertiaryStateActive,
  mixinButtonTextBrandPrimaryStateActive,
  mixinButtonTextBrandSecondaryStateActive,
  mixinButtonDangerStateDisabled,
  mixinButtonPrimaryStateDisabled,
  mixinButtonSecondaryStateDisabled,
  mixinButtonSecondaryAltStateDisabled,
  mixinButtonTertiaryStateDisabled,
  mixinButtonTertiaryAltStateDisabled,
  mixinButtonBrandPrimaryStateDisabled,
  mixinButtonBrandSecondaryStateDisabled,
  mixinButtonBrandSecondaryAltStateDisabled,
  mixinButtonBrandTertiaryStateDisabled,
  mixinButtonTextPrimaryStateDisabled,
  mixinButtonTextSecondaryStateDisabled,
  mixinButtonTextTertiaryStateDisabled,
  mixinButtonTextBrandPrimaryStateDisabled,
  mixinButtonTextBrandSecondaryStateDisabled,
  mixinButtonDanger,
  mixinButtonPrimary,
  mixinButtonSecondary,
  mixinButtonSecondaryAlt,
  mixinButtonTertiary,
  mixinButtonTertiaryAlt,
  mixinButtonBrandPrimary,
  mixinButtonBrandSecondary,
  mixinButtonBrandSecondaryAlt,
  mixinButtonBrandTertiary,
  mixinButtonTextPrimary,
  mixinButtonTextSecondary,
  mixinButtonTextTertiary,
  mixinButtonTextBrandPrimary,
  mixinButtonTextBrandSecondary
} from '@kcuf/fork-console-base-theme';

import {
  IScButtonProps
} from '../types';

const MAPPING_DISABLED: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DANGER]: mixinButtonDangerStateDisabled,
  [ButtonPreset.PRIMARY]: mixinButtonPrimaryStateDisabled,
  [ButtonPreset.SECONDARY]: mixinButtonSecondaryStateDisabled,
  [ButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAltStateDisabled,
  [ButtonPreset.TERTIARY]: mixinButtonTertiaryStateDisabled,
  [ButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAltStateDisabled,
  [ButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimaryStateDisabled,
  [ButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondaryStateDisabled,
  [ButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAltStateDisabled,
  [ButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiaryStateDisabled,
  [ButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimaryStateDisabled,
  [ButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondaryStateDisabled,
  [ButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiaryStateDisabled,
  [ButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimaryStateDisabled,
  [ButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondaryStateDisabled
};

const MAPPING_NORMAL: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DANGER]: mixinButtonDangerStateNormal,
  [ButtonPreset.PRIMARY]: mixinButtonPrimaryStateNormal,
  [ButtonPreset.SECONDARY]: mixinButtonSecondaryStateNormal,
  [ButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAltStateNormal,
  [ButtonPreset.TERTIARY]: mixinButtonTertiaryStateNormal,
  [ButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAltStateNormal,
  [ButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimaryStateNormal,
  [ButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondaryStateNormal,
  [ButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAltStateNormal,
  [ButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiaryStateNormal,
  [ButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimaryStateNormal,
  [ButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondaryStateNormal,
  [ButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiaryStateNormal,
  [ButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimaryStateNormal,
  [ButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondaryStateNormal
};

const MAPPING_ACTIVE: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DANGER]: mixinButtonDangerStateActive,
  [ButtonPreset.PRIMARY]: mixinButtonPrimaryStateActive,
  [ButtonPreset.SECONDARY]: mixinButtonSecondaryStateActive,
  [ButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAltStateActive,
  [ButtonPreset.TERTIARY]: mixinButtonTertiaryStateActive,
  [ButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAltStateActive,
  [ButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimaryStateActive,
  [ButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondaryStateActive,
  [ButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAltStateActive,
  [ButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiaryStateActive,
  [ButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimaryStateActive,
  [ButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondaryStateActive,
  [ButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiaryStateActive,
  [ButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimaryStateActive,
  [ButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondaryStateActive
};

const MAPPING: Record<ButtonPreset, RuleSet | null> = {
  [ButtonPreset.NONE]: null,
  [ButtonPreset.DANGER]: mixinButtonDanger,
  [ButtonPreset.PRIMARY]: mixinButtonPrimary,
  [ButtonPreset.SECONDARY]: mixinButtonSecondary,
  [ButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAlt,
  [ButtonPreset.TERTIARY]: mixinButtonTertiary,
  [ButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAlt,
  [ButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimary,
  [ButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondary,
  [ButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAlt,
  [ButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiary,
  [ButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimary,
  [ButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondary,
  [ButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiary,
  [ButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimary,
  [ButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondary
};

export default function cssButtonPreset(props: IScButtonProps): RuleSet | null {
  if (props.disabled) {
    return (props.$preset ? MAPPING_DISABLED[props.$preset] : null) || mixinButtonTextTertiaryStateDisabled;
  }
  
  if (props.$active) {
    return props.$preset ? MAPPING_ACTIVE[props.$preset] : null;
  }
  
  if (props['data-button-loading'] !== undefined) { // loading 的时候没有 hover 样式
    return props.$preset ? MAPPING_NORMAL[props.$preset] : null;
  }
  
  return props.$preset ? MAPPING[props.$preset] : null;
}
