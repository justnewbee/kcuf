import {
  RuleSet
} from 'styled-components';

import {
  mixinButtonDangerStateNormal,
  mixinButtonMenuStateNormal,
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
  mixinButtonMenuStateActive,
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
  mixinButtonMenuStateDisabled,
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
  mixinButtonMenu,
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
} from '@alicloud/console-base-theme';

import {
  EButtonPreset
} from '../../model';
import {
  IScButtonProps
} from '../types';

const MAPPING_DISABLED: Record<EButtonPreset, RuleSet | null> = {
  [EButtonPreset.NONE]: null,
  [EButtonPreset.DANGER]: mixinButtonDangerStateDisabled,
  [EButtonPreset.MENU]: mixinButtonMenuStateDisabled,
  [EButtonPreset.PRIMARY]: mixinButtonPrimaryStateDisabled,
  [EButtonPreset.SECONDARY]: mixinButtonSecondaryStateDisabled,
  [EButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAltStateDisabled,
  [EButtonPreset.TERTIARY]: mixinButtonTertiaryStateDisabled,
  [EButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAltStateDisabled,
  [EButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimaryStateDisabled,
  [EButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondaryStateDisabled,
  [EButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAltStateDisabled,
  [EButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiaryStateDisabled,
  [EButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimaryStateDisabled,
  [EButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondaryStateDisabled,
  [EButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiaryStateDisabled,
  [EButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimaryStateDisabled,
  [EButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondaryStateDisabled
};

const MAPPING_NORMAL: Record<EButtonPreset, RuleSet | null> = {
  [EButtonPreset.NONE]: null,
  [EButtonPreset.DANGER]: mixinButtonDangerStateNormal,
  [EButtonPreset.MENU]: mixinButtonMenuStateNormal,
  [EButtonPreset.PRIMARY]: mixinButtonPrimaryStateNormal,
  [EButtonPreset.SECONDARY]: mixinButtonSecondaryStateNormal,
  [EButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAltStateNormal,
  [EButtonPreset.TERTIARY]: mixinButtonTertiaryStateNormal,
  [EButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAltStateNormal,
  [EButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimaryStateNormal,
  [EButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondaryStateNormal,
  [EButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAltStateNormal,
  [EButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiaryStateNormal,
  [EButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimaryStateNormal,
  [EButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondaryStateNormal,
  [EButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiaryStateNormal,
  [EButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimaryStateNormal,
  [EButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondaryStateNormal
};

const MAPPING_ACTIVE: Record<EButtonPreset, RuleSet | null> = {
  [EButtonPreset.NONE]: null,
  [EButtonPreset.DANGER]: mixinButtonDangerStateActive,
  [EButtonPreset.MENU]: mixinButtonMenuStateActive,
  [EButtonPreset.PRIMARY]: mixinButtonPrimaryStateActive,
  [EButtonPreset.SECONDARY]: mixinButtonSecondaryStateActive,
  [EButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAltStateActive,
  [EButtonPreset.TERTIARY]: mixinButtonTertiaryStateActive,
  [EButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAltStateActive,
  [EButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimaryStateActive,
  [EButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondaryStateActive,
  [EButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAltStateActive,
  [EButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiaryStateActive,
  [EButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimaryStateActive,
  [EButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondaryStateActive,
  [EButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiaryStateActive,
  [EButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimaryStateActive,
  [EButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondaryStateActive
};

const MAPPING: Record<EButtonPreset, RuleSet | null> = {
  [EButtonPreset.NONE]: null,
  [EButtonPreset.DANGER]: mixinButtonDanger,
  [EButtonPreset.MENU]: mixinButtonMenu,
  [EButtonPreset.PRIMARY]: mixinButtonPrimary,
  [EButtonPreset.SECONDARY]: mixinButtonSecondary,
  [EButtonPreset.SECONDARY_ALT]: mixinButtonSecondaryAlt,
  [EButtonPreset.TERTIARY]: mixinButtonTertiary,
  [EButtonPreset.TERTIARY_ALT]: mixinButtonTertiaryAlt,
  [EButtonPreset.BRAND_PRIMARY]: mixinButtonBrandPrimary,
  [EButtonPreset.BRAND_SECONDARY]: mixinButtonBrandSecondary,
  [EButtonPreset.BRAND_SECONDARY_ALT]: mixinButtonBrandSecondaryAlt,
  [EButtonPreset.BRAND_TERTIARY]: mixinButtonBrandTertiary,
  [EButtonPreset.TEXT_PRIMARY]: mixinButtonTextPrimary,
  [EButtonPreset.TEXT_SECONDARY]: mixinButtonTextSecondary,
  [EButtonPreset.TEXT_TERTIARY]: mixinButtonTextTertiary,
  [EButtonPreset.TEXT_BRAND_PRIMARY]: mixinButtonTextBrandPrimary,
  [EButtonPreset.TEXT_BRAND_SECONDARY]: mixinButtonTextBrandSecondary
};

export default function cssButtonPreset(props: IScButtonProps): RuleSet | null {
  if (props.disabled) {
    return (props.$preset ? MAPPING_DISABLED[props.$preset] : null) || mixinButtonTextTertiaryStateDisabled;
  }
  
  if (props.$active) {
    return props.$preset ? MAPPING_ACTIVE[props.$preset] : null;
  }
  
  if (props.$loading) { // loading 的时候没有 hover 样式
    return props.$preset ? MAPPING_NORMAL[props.$preset] : null;
  }
  
  return props.$preset ? MAPPING[props.$preset] : null;
}
