import {
  css
} from 'styled-components';

import {
  COLOR,
  SIZE
} from '../var';

import {
  mixinShadowLDown
} from './shadow';

export const mixinButtonShadow = css`
  &:hover {
    ${mixinShadowLDown}
  }
  
  &:active,
  &:disabled {
    box-shadow: none;
  }
`;

// size mixins
export const mixinButtonSizeXs = css`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_XS}px;
  height: ${SIZE.HEIGHT_FORM_CONTROL_XS}px;
  font-size: ${SIZE.FONT_SIZE_FORM_CONTROL_XS}px;
  line-height: ${SIZE.HEIGHT_FORM_CONTROL_XS - 2}px;
`;
export const mixinButtonSizeS = css`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_S}px;
  height: ${SIZE.HEIGHT_FORM_CONTROL_S}px;
  font-size: ${SIZE.FONT_SIZE_FORM_CONTROL_S}px;
  line-height: ${SIZE.HEIGHT_FORM_CONTROL_S - 2}px;
`;
export const mixinButtonSizeM = css`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_M}px;
  height: ${SIZE.HEIGHT_FORM_CONTROL_M}px;
  font-size: ${SIZE.FONT_SIZE_FORM_CONTROL_M}px;
  line-height: ${SIZE.HEIGHT_FORM_CONTROL_M - 2}px;
`;
export const mixinButtonSizeL = css`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_L}px;
  height: ${SIZE.HEIGHT_FORM_CONTROL_L}px;
  font-size: ${SIZE.FONT_SIZE_FORM_CONTROL_L}px;
  line-height: ${SIZE.HEIGHT_FORM_CONTROL_L - 2}px;
`;
export const mixinButtonSizeXl = css`
  padding: 0 ${SIZE.PADDING_X_FORM_CONTROL_XL}px;
  height: ${SIZE.HEIGHT_FORM_CONTROL_XL}px;
  font-size: ${SIZE.FONT_SIZE_FORM_CONTROL_XL}px;
  line-height: ${SIZE.HEIGHT_FORM_CONTROL_XL - 2}px;
`;

// theme mixins
export const mixinButtonDangerColorStateNormal = css`
  color: var(--kcuf-color-button-danger-text, ${COLOR.BUTTON_DANGER_TEXT});
`;
export const mixinButtonDangerBgStateNormal = css`
  background-color: var(--kcuf-color-button-danger-bg, ${COLOR.BUTTON_DANGER_BG});
`;
export const mixinButtonDangerBorderStateNormal = css`
  border-color: var(--kcuf-color-button-danger-border, ${COLOR.BUTTON_DANGER_BORDER});
`;
export const mixinButtonDangerStateNormal = css`
  ${mixinButtonDangerColorStateNormal}
  ${mixinButtonDangerBgStateNormal}
  ${mixinButtonDangerBorderStateNormal}
`;
export const mixinButtonDangerColorStateHover = css`
  color: var(--kcuf-color-button-danger-text-hover, ${COLOR.BUTTON_DANGER_TEXT_HOVER});
`;
export const mixinButtonDangerBgStateHover = css`
  background-color: var(--kcuf-color-button-danger-bg-hover, ${COLOR.BUTTON_DANGER_BG_HOVER});
`;
export const mixinButtonDangerBorderStateHover = css`
  border-color: var(--kcuf-color-button-danger-border-hover, ${COLOR.BUTTON_DANGER_BORDER_HOVER});
`;
export const mixinButtonDangerStateHover = css`
  ${mixinButtonDangerColorStateHover}
  ${mixinButtonDangerBgStateHover}
  ${mixinButtonDangerBorderStateHover}
`;
export const mixinButtonDangerColorStateActive = css`
  color: var(--kcuf-color-button-danger-text-active, ${COLOR.BUTTON_DANGER_TEXT_ACTIVE});
`;
export const mixinButtonDangerBgStateActive = css`
  background-color: var(--kcuf-color-button-danger-bg-active, ${COLOR.BUTTON_DANGER_BG_ACTIVE});
`;
export const mixinButtonDangerBorderStateActive = css`
  border-color: var(--kcuf-color-button-danger-border-active, ${COLOR.BUTTON_DANGER_BORDER_ACTIVE});
`;
export const mixinButtonDangerStateActive = css`
  ${mixinButtonDangerColorStateActive}
  ${mixinButtonDangerBgStateActive}
  ${mixinButtonDangerBorderStateActive}
`;
export const mixinButtonDangerColorStateDisabled = css`
  color: var(--kcuf-color-button-danger-text-disabled, ${COLOR.BUTTON_DANGER_TEXT_DISABLED});
`;
export const mixinButtonDangerBgStateDisabled = css`
  background-color: var(--kcuf-color-button-danger-bg-disabled, ${COLOR.BUTTON_DANGER_BG_DISABLED});
`;
export const mixinButtonDangerBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-danger-border-disabled, ${COLOR.BUTTON_DANGER_BORDER_DISABLED});
`;
export const mixinButtonDangerStateDisabled = css`
  ${mixinButtonDangerColorStateDisabled}
  ${mixinButtonDangerBgStateDisabled}
  ${mixinButtonDangerBorderStateDisabled}
`;
export const mixinButtonDanger = css`
  ${mixinButtonDangerStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonDangerColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonDangerStateHover}
  }
  
  &:active {
    ${mixinButtonDangerStateActive}
  }
  
  &:disabled {
    ${mixinButtonDangerStateDisabled}
  }
`;
export const mixinButtonMenuColorStateNormal = css`
  color: var(--kcuf-color-button-menu-text, ${COLOR.BUTTON_MENU_TEXT});
`;
export const mixinButtonMenuBgStateNormal = css`
  background-color: var(--kcuf-color-button-menu-bg, ${COLOR.BUTTON_MENU_BG});
`;
export const mixinButtonMenuBorderStateNormal = css`
  border-color: var(--kcuf-color-button-menu-border, ${COLOR.BUTTON_MENU_BORDER});
`;
export const mixinButtonMenuStateNormal = css`
  ${mixinButtonMenuColorStateNormal}
  ${mixinButtonMenuBgStateNormal}
  ${mixinButtonMenuBorderStateNormal}
`;
export const mixinButtonMenuColorStateHover = css`
  color: var(--kcuf-color-button-menu-text-hover, ${COLOR.BUTTON_MENU_TEXT_HOVER});
`;
export const mixinButtonMenuBgStateHover = css`
  background-color: var(--kcuf-color-button-menu-bg-hover, ${COLOR.BUTTON_MENU_BG_HOVER});
`;
export const mixinButtonMenuBorderStateHover = css`
  border-color: var(--kcuf-color-button-menu-border-hover, ${COLOR.BUTTON_MENU_BORDER_HOVER});
`;
export const mixinButtonMenuStateHover = css`
  ${mixinButtonMenuColorStateHover}
  ${mixinButtonMenuBgStateHover}
  ${mixinButtonMenuBorderStateHover}
`;
export const mixinButtonMenuColorStateActive = css`
  color: var(--kcuf-color-button-menu-text-active, ${COLOR.BUTTON_MENU_TEXT_ACTIVE});
`;
export const mixinButtonMenuBgStateActive = css`
  background-color: var(--kcuf-color-button-menu-bg-active, ${COLOR.BUTTON_MENU_BG_ACTIVE});
`;
export const mixinButtonMenuBorderStateActive = css`
  border-color: var(--kcuf-color-button-menu-border-active, ${COLOR.BUTTON_MENU_BORDER_ACTIVE});
`;
export const mixinButtonMenuStateActive = css`
  ${mixinButtonMenuColorStateActive}
  ${mixinButtonMenuBgStateActive}
  ${mixinButtonMenuBorderStateActive}
`;
export const mixinButtonMenuColorStateDisabled = css`
  color: var(--kcuf-color-button-menu-text-disabled, ${COLOR.BUTTON_MENU_TEXT_DISABLED});
`;
export const mixinButtonMenuBgStateDisabled = css`
  background-color: var(--kcuf-color-button-menu-bg-disabled, ${COLOR.BUTTON_MENU_BG_DISABLED});
`;
export const mixinButtonMenuBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-menu-border-disabled, ${COLOR.BUTTON_MENU_BORDER_DISABLED});
`;
export const mixinButtonMenuStateDisabled = css`
  ${mixinButtonMenuColorStateDisabled}
  ${mixinButtonMenuBgStateDisabled}
  ${mixinButtonMenuBorderStateDisabled}
`;
export const mixinButtonMenu = css`
  ${mixinButtonMenuStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonMenuColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonMenuStateHover}
  }
  
  &:active {
    ${mixinButtonMenuStateActive}
  }
  
  &:disabled {
    ${mixinButtonMenuStateDisabled}
  }
`;
export const mixinButtonPrimaryColorStateNormal = css`
  color: var(--kcuf-color-button-primary-text, ${COLOR.BUTTON_PRIMARY_TEXT});
`;
export const mixinButtonPrimaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-primary-bg, ${COLOR.BUTTON_PRIMARY_BG});
`;
export const mixinButtonPrimaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-primary-border, ${COLOR.BUTTON_PRIMARY_BORDER});
`;
export const mixinButtonPrimaryStateNormal = css`
  ${mixinButtonPrimaryColorStateNormal}
  ${mixinButtonPrimaryBgStateNormal}
  ${mixinButtonPrimaryBorderStateNormal}
`;
export const mixinButtonPrimaryColorStateHover = css`
  color: var(--kcuf-color-button-primary-text-hover, ${COLOR.BUTTON_PRIMARY_TEXT_HOVER});
`;
export const mixinButtonPrimaryBgStateHover = css`
  background-color: var(--kcuf-color-button-primary-bg-hover, ${COLOR.BUTTON_PRIMARY_BG_HOVER});
`;
export const mixinButtonPrimaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-primary-border-hover, ${COLOR.BUTTON_PRIMARY_BORDER_HOVER});
`;
export const mixinButtonPrimaryStateHover = css`
  ${mixinButtonPrimaryColorStateHover}
  ${mixinButtonPrimaryBgStateHover}
  ${mixinButtonPrimaryBorderStateHover}
`;
export const mixinButtonPrimaryColorStateActive = css`
  color: var(--kcuf-color-button-primary-text-active, ${COLOR.BUTTON_PRIMARY_TEXT_ACTIVE});
`;
export const mixinButtonPrimaryBgStateActive = css`
  background-color: var(--kcuf-color-button-primary-bg-active, ${COLOR.BUTTON_PRIMARY_BG_ACTIVE});
`;
export const mixinButtonPrimaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-primary-border-active, ${COLOR.BUTTON_PRIMARY_BORDER_ACTIVE});
`;
export const mixinButtonPrimaryStateActive = css`
  ${mixinButtonPrimaryColorStateActive}
  ${mixinButtonPrimaryBgStateActive}
  ${mixinButtonPrimaryBorderStateActive}
`;
export const mixinButtonPrimaryColorStateDisabled = css`
  color: var(--kcuf-color-button-primary-text-disabled, ${COLOR.BUTTON_PRIMARY_TEXT_DISABLED});
`;
export const mixinButtonPrimaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-primary-bg-disabled, ${COLOR.BUTTON_PRIMARY_BG_DISABLED});
`;
export const mixinButtonPrimaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-primary-border-disabled, ${COLOR.BUTTON_PRIMARY_BORDER_DISABLED});
`;
export const mixinButtonPrimaryStateDisabled = css`
  ${mixinButtonPrimaryColorStateDisabled}
  ${mixinButtonPrimaryBgStateDisabled}
  ${mixinButtonPrimaryBorderStateDisabled}
`;
export const mixinButtonPrimary = css`
  ${mixinButtonPrimaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonPrimaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonPrimaryStateHover}
  }
  
  &:active {
    ${mixinButtonPrimaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonPrimaryStateDisabled}
  }
`;
export const mixinButtonSecondaryColorStateNormal = css`
  color: var(--kcuf-color-button-secondary-text, ${COLOR.BUTTON_SECONDARY_TEXT});
`;
export const mixinButtonSecondaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-secondary-bg, ${COLOR.BUTTON_SECONDARY_BG});
`;
export const mixinButtonSecondaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-secondary-border, ${COLOR.BUTTON_SECONDARY_BORDER});
`;
export const mixinButtonSecondaryStateNormal = css`
  ${mixinButtonSecondaryColorStateNormal}
  ${mixinButtonSecondaryBgStateNormal}
  ${mixinButtonSecondaryBorderStateNormal}
`;
export const mixinButtonSecondaryColorStateHover = css`
  color: var(--kcuf-color-button-secondary-text-hover, ${COLOR.BUTTON_SECONDARY_TEXT_HOVER});
`;
export const mixinButtonSecondaryBgStateHover = css`
  background-color: var(--kcuf-color-button-secondary-bg-hover, ${COLOR.BUTTON_SECONDARY_BG_HOVER});
`;
export const mixinButtonSecondaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-secondary-border-hover, ${COLOR.BUTTON_SECONDARY_BORDER_HOVER});
`;
export const mixinButtonSecondaryStateHover = css`
  ${mixinButtonSecondaryColorStateHover}
  ${mixinButtonSecondaryBgStateHover}
  ${mixinButtonSecondaryBorderStateHover}
`;
export const mixinButtonSecondaryColorStateActive = css`
  color: var(--kcuf-color-button-secondary-text-active, ${COLOR.BUTTON_SECONDARY_TEXT_ACTIVE});
`;
export const mixinButtonSecondaryBgStateActive = css`
  background-color: var(--kcuf-color-button-secondary-bg-active, ${COLOR.BUTTON_SECONDARY_BG_ACTIVE});
`;
export const mixinButtonSecondaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-secondary-border-active, ${COLOR.BUTTON_SECONDARY_BORDER_ACTIVE});
`;
export const mixinButtonSecondaryStateActive = css`
  ${mixinButtonSecondaryColorStateActive}
  ${mixinButtonSecondaryBgStateActive}
  ${mixinButtonSecondaryBorderStateActive}
`;
export const mixinButtonSecondaryColorStateDisabled = css`
  color: var(--kcuf-color-button-secondary-text-disabled, ${COLOR.BUTTON_SECONDARY_TEXT_DISABLED});
`;
export const mixinButtonSecondaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-secondary-bg-disabled, ${COLOR.BUTTON_SECONDARY_BG_DISABLED});
`;
export const mixinButtonSecondaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-secondary-border-disabled, ${COLOR.BUTTON_SECONDARY_BORDER_DISABLED});
`;
export const mixinButtonSecondaryStateDisabled = css`
  ${mixinButtonSecondaryColorStateDisabled}
  ${mixinButtonSecondaryBgStateDisabled}
  ${mixinButtonSecondaryBorderStateDisabled}
`;
export const mixinButtonSecondary = css`
  ${mixinButtonSecondaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonSecondaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonSecondaryStateHover}
  }
  
  &:active {
    ${mixinButtonSecondaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonSecondaryStateDisabled}
  }
`;
export const mixinButtonSecondaryAltColorStateNormal = css`
  color: var(--kcuf-color-button-secondary-alt-text, ${COLOR.BUTTON_SECONDARY_ALT_TEXT});
`;
export const mixinButtonSecondaryAltBgStateNormal = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg, ${COLOR.BUTTON_SECONDARY_ALT_BG});
`;
export const mixinButtonSecondaryAltBorderStateNormal = css`
  border-color: var(--kcuf-color-button-secondary-alt-border, ${COLOR.BUTTON_SECONDARY_ALT_BORDER});
`;
export const mixinButtonSecondaryAltStateNormal = css`
  ${mixinButtonSecondaryAltColorStateNormal}
  ${mixinButtonSecondaryAltBgStateNormal}
  ${mixinButtonSecondaryAltBorderStateNormal}
`;
export const mixinButtonSecondaryAltColorStateHover = css`
  color: var(--kcuf-color-button-secondary-alt-text-hover, ${COLOR.BUTTON_SECONDARY_ALT_TEXT_HOVER});
`;
export const mixinButtonSecondaryAltBgStateHover = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg-hover, ${COLOR.BUTTON_SECONDARY_ALT_BG_HOVER});
`;
export const mixinButtonSecondaryAltBorderStateHover = css`
  border-color: var(--kcuf-color-button-secondary-alt-border-hover, ${COLOR.BUTTON_SECONDARY_ALT_BORDER_HOVER});
`;
export const mixinButtonSecondaryAltStateHover = css`
  ${mixinButtonSecondaryAltColorStateHover}
  ${mixinButtonSecondaryAltBgStateHover}
  ${mixinButtonSecondaryAltBorderStateHover}
`;
export const mixinButtonSecondaryAltColorStateActive = css`
  color: var(--kcuf-color-button-secondary-alt-text-active, ${COLOR.BUTTON_SECONDARY_ALT_TEXT_ACTIVE});
`;
export const mixinButtonSecondaryAltBgStateActive = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg-active, ${COLOR.BUTTON_SECONDARY_ALT_BG_ACTIVE});
`;
export const mixinButtonSecondaryAltBorderStateActive = css`
  border-color: var(--kcuf-color-button-secondary-alt-border-active, ${COLOR.BUTTON_SECONDARY_ALT_BORDER_ACTIVE});
`;
export const mixinButtonSecondaryAltStateActive = css`
  ${mixinButtonSecondaryAltColorStateActive}
  ${mixinButtonSecondaryAltBgStateActive}
  ${mixinButtonSecondaryAltBorderStateActive}
`;
export const mixinButtonSecondaryAltColorStateDisabled = css`
  color: var(--kcuf-color-button-secondary-alt-text-disabled, ${COLOR.BUTTON_SECONDARY_ALT_TEXT_DISABLED});
`;
export const mixinButtonSecondaryAltBgStateDisabled = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg-disabled, ${COLOR.BUTTON_SECONDARY_ALT_BG_DISABLED});
`;
export const mixinButtonSecondaryAltBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-secondary-alt-border-disabled, ${COLOR.BUTTON_SECONDARY_ALT_BORDER_DISABLED});
`;
export const mixinButtonSecondaryAltStateDisabled = css`
  ${mixinButtonSecondaryAltColorStateDisabled}
  ${mixinButtonSecondaryAltBgStateDisabled}
  ${mixinButtonSecondaryAltBorderStateDisabled}
`;
export const mixinButtonSecondaryAlt = css`
  ${mixinButtonSecondaryAltStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonSecondaryAltColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonSecondaryAltStateHover}
  }
  
  &:active {
    ${mixinButtonSecondaryAltStateActive}
  }
  
  &:disabled {
    ${mixinButtonSecondaryAltStateDisabled}
  }
`;
export const mixinButtonTertiaryColorStateNormal = css`
  color: var(--kcuf-color-button-tertiary-text, ${COLOR.BUTTON_TERTIARY_TEXT});
`;
export const mixinButtonTertiaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-tertiary-bg, ${COLOR.BUTTON_TERTIARY_BG});
`;
export const mixinButtonTertiaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-tertiary-border, ${COLOR.BUTTON_TERTIARY_BORDER});
`;
export const mixinButtonTertiaryStateNormal = css`
  ${mixinButtonTertiaryColorStateNormal}
  ${mixinButtonTertiaryBgStateNormal}
  ${mixinButtonTertiaryBorderStateNormal}
`;
export const mixinButtonTertiaryColorStateHover = css`
  color: var(--kcuf-color-button-tertiary-text-hover, ${COLOR.BUTTON_TERTIARY_TEXT_HOVER});
`;
export const mixinButtonTertiaryBgStateHover = css`
  background-color: var(--kcuf-color-button-tertiary-bg-hover, ${COLOR.BUTTON_TERTIARY_BG_HOVER});
`;
export const mixinButtonTertiaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-tertiary-border-hover, ${COLOR.BUTTON_TERTIARY_BORDER_HOVER});
`;
export const mixinButtonTertiaryStateHover = css`
  ${mixinButtonTertiaryColorStateHover}
  ${mixinButtonTertiaryBgStateHover}
  ${mixinButtonTertiaryBorderStateHover}
`;
export const mixinButtonTertiaryColorStateActive = css`
  color: var(--kcuf-color-button-tertiary-text-active, ${COLOR.BUTTON_TERTIARY_TEXT_ACTIVE});
`;
export const mixinButtonTertiaryBgStateActive = css`
  background-color: var(--kcuf-color-button-tertiary-bg-active, ${COLOR.BUTTON_TERTIARY_BG_ACTIVE});
`;
export const mixinButtonTertiaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-tertiary-border-active, ${COLOR.BUTTON_TERTIARY_BORDER_ACTIVE});
`;
export const mixinButtonTertiaryStateActive = css`
  ${mixinButtonTertiaryColorStateActive}
  ${mixinButtonTertiaryBgStateActive}
  ${mixinButtonTertiaryBorderStateActive}
`;
export const mixinButtonTertiaryColorStateDisabled = css`
  color: var(--kcuf-color-button-tertiary-text-disabled, ${COLOR.BUTTON_TERTIARY_TEXT_DISABLED});
`;
export const mixinButtonTertiaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-tertiary-bg-disabled, ${COLOR.BUTTON_TERTIARY_BG_DISABLED});
`;
export const mixinButtonTertiaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-tertiary-border-disabled, ${COLOR.BUTTON_TERTIARY_BORDER_DISABLED});
`;
export const mixinButtonTertiaryStateDisabled = css`
  ${mixinButtonTertiaryColorStateDisabled}
  ${mixinButtonTertiaryBgStateDisabled}
  ${mixinButtonTertiaryBorderStateDisabled}
`;
export const mixinButtonTertiary = css`
  ${mixinButtonTertiaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTertiaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTertiaryStateHover}
  }
  
  &:active {
    ${mixinButtonTertiaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonTertiaryStateDisabled}
  }
`;
export const mixinButtonTertiaryAltColorStateNormal = css`
  color: var(--kcuf-color-button-tertiary-alt-text, ${COLOR.BUTTON_TERTIARY_ALT_TEXT});
`;
export const mixinButtonTertiaryAltBgStateNormal = css`
  background-color: var(--kcuf-color-button-tertiary-alt-bg, ${COLOR.BUTTON_TERTIARY_ALT_BG});
`;
export const mixinButtonTertiaryAltBorderStateNormal = css`
  border-color: var(--kcuf-color-button-tertiary-alt-border, ${COLOR.BUTTON_TERTIARY_ALT_BORDER});
`;
export const mixinButtonTertiaryAltStateNormal = css`
  ${mixinButtonTertiaryAltColorStateNormal}
  ${mixinButtonTertiaryAltBgStateNormal}
  ${mixinButtonTertiaryAltBorderStateNormal}
`;
export const mixinButtonTertiaryAltColorStateHover = css`
  color: var(--kcuf-color-button-tertiary-alt-text-hover, ${COLOR.BUTTON_TERTIARY_ALT_TEXT_HOVER});
`;
export const mixinButtonTertiaryAltBgStateHover = css`
  background-color: var(--kcuf-color-button-tertiary-alt-bg-hover, ${COLOR.BUTTON_TERTIARY_ALT_BG_HOVER});
`;
export const mixinButtonTertiaryAltBorderStateHover = css`
  border-color: var(--kcuf-color-button-tertiary-alt-border-hover, ${COLOR.BUTTON_TERTIARY_ALT_BORDER_HOVER});
`;
export const mixinButtonTertiaryAltStateHover = css`
  ${mixinButtonTertiaryAltColorStateHover}
  ${mixinButtonTertiaryAltBgStateHover}
  ${mixinButtonTertiaryAltBorderStateHover}
`;
export const mixinButtonTertiaryAltColorStateActive = css`
  color: var(--kcuf-color-button-tertiary-alt-text-active, ${COLOR.BUTTON_TERTIARY_ALT_TEXT_ACTIVE});
`;
export const mixinButtonTertiaryAltBgStateActive = css`
  background-color: var(--kcuf-color-button-tertiary-alt-bg-active, ${COLOR.BUTTON_TERTIARY_ALT_BG_ACTIVE});
`;
export const mixinButtonTertiaryAltBorderStateActive = css`
  border-color: var(--kcuf-color-button-tertiary-alt-border-active, ${COLOR.BUTTON_TERTIARY_ALT_BORDER_ACTIVE});
`;
export const mixinButtonTertiaryAltStateActive = css`
  ${mixinButtonTertiaryAltColorStateActive}
  ${mixinButtonTertiaryAltBgStateActive}
  ${mixinButtonTertiaryAltBorderStateActive}
`;
export const mixinButtonTertiaryAltColorStateDisabled = css`
  color: var(--kcuf-color-button-tertiary-alt-text-disabled, ${COLOR.BUTTON_TERTIARY_ALT_TEXT_DISABLED});
`;
export const mixinButtonTertiaryAltBgStateDisabled = css`
  background-color: var(--kcuf-color-button-tertiary-alt-bg-disabled, ${COLOR.BUTTON_TERTIARY_ALT_BG_DISABLED});
`;
export const mixinButtonTertiaryAltBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-tertiary-alt-border-disabled, ${COLOR.BUTTON_TERTIARY_ALT_BORDER_DISABLED});
`;
export const mixinButtonTertiaryAltStateDisabled = css`
  ${mixinButtonTertiaryAltColorStateDisabled}
  ${mixinButtonTertiaryAltBgStateDisabled}
  ${mixinButtonTertiaryAltBorderStateDisabled}
`;
export const mixinButtonTertiaryAlt = css`
  ${mixinButtonTertiaryAltStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTertiaryAltColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTertiaryAltStateHover}
  }
  
  &:active {
    ${mixinButtonTertiaryAltStateActive}
  }
  
  &:disabled {
    ${mixinButtonTertiaryAltStateDisabled}
  }
`;
export const mixinButtonBrandPrimaryColorStateNormal = css`
  color: var(--kcuf-color-button-brand-primary-text, ${COLOR.BUTTON_BRAND_PRIMARY_TEXT});
`;
export const mixinButtonBrandPrimaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-brand-primary-bg, ${COLOR.BUTTON_BRAND_PRIMARY_BG});
`;
export const mixinButtonBrandPrimaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-brand-primary-border, ${COLOR.BUTTON_BRAND_PRIMARY_BORDER});
`;
export const mixinButtonBrandPrimaryStateNormal = css`
  ${mixinButtonBrandPrimaryColorStateNormal}
  ${mixinButtonBrandPrimaryBgStateNormal}
  ${mixinButtonBrandPrimaryBorderStateNormal}
`;
export const mixinButtonBrandPrimaryColorStateHover = css`
  color: var(--kcuf-color-button-brand-primary-text-hover, ${COLOR.BUTTON_BRAND_PRIMARY_TEXT_HOVER});
`;
export const mixinButtonBrandPrimaryBgStateHover = css`
  background-color: var(--kcuf-color-button-brand-primary-bg-hover, ${COLOR.BUTTON_BRAND_PRIMARY_BG_HOVER});
`;
export const mixinButtonBrandPrimaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-brand-primary-border-hover, ${COLOR.BUTTON_BRAND_PRIMARY_BORDER_HOVER});
`;
export const mixinButtonBrandPrimaryStateHover = css`
  ${mixinButtonBrandPrimaryColorStateHover}
  ${mixinButtonBrandPrimaryBgStateHover}
  ${mixinButtonBrandPrimaryBorderStateHover}
`;
export const mixinButtonBrandPrimaryColorStateActive = css`
  color: var(--kcuf-color-button-brand-primary-text-active, ${COLOR.BUTTON_BRAND_PRIMARY_TEXT_ACTIVE});
`;
export const mixinButtonBrandPrimaryBgStateActive = css`
  background-color: var(--kcuf-color-button-brand-primary-bg-active, ${COLOR.BUTTON_BRAND_PRIMARY_BG_ACTIVE});
`;
export const mixinButtonBrandPrimaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-brand-primary-border-active, ${COLOR.BUTTON_BRAND_PRIMARY_BORDER_ACTIVE});
`;
export const mixinButtonBrandPrimaryStateActive = css`
  ${mixinButtonBrandPrimaryColorStateActive}
  ${mixinButtonBrandPrimaryBgStateActive}
  ${mixinButtonBrandPrimaryBorderStateActive}
`;
export const mixinButtonBrandPrimaryColorStateDisabled = css`
  color: var(--kcuf-color-button-brand-primary-text-disabled, ${COLOR.BUTTON_BRAND_PRIMARY_TEXT_DISABLED});
`;
export const mixinButtonBrandPrimaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-brand-primary-bg-disabled, ${COLOR.BUTTON_BRAND_PRIMARY_BG_DISABLED});
`;
export const mixinButtonBrandPrimaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-brand-primary-border-disabled, ${COLOR.BUTTON_BRAND_PRIMARY_BORDER_DISABLED});
`;
export const mixinButtonBrandPrimaryStateDisabled = css`
  ${mixinButtonBrandPrimaryColorStateDisabled}
  ${mixinButtonBrandPrimaryBgStateDisabled}
  ${mixinButtonBrandPrimaryBorderStateDisabled}
`;
export const mixinButtonBrandPrimary = css`
  ${mixinButtonBrandPrimaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonBrandPrimaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonBrandPrimaryStateHover}
  }
  
  &:active {
    ${mixinButtonBrandPrimaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonBrandPrimaryStateDisabled}
  }
`;
export const mixinButtonBrandSecondaryColorStateNormal = css`
  color: var(--kcuf-color-button-brand-secondary-text, ${COLOR.BUTTON_BRAND_SECONDARY_TEXT});
`;
export const mixinButtonBrandSecondaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-brand-secondary-bg, ${COLOR.BUTTON_BRAND_SECONDARY_BG});
`;
export const mixinButtonBrandSecondaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-brand-secondary-border, ${COLOR.BUTTON_BRAND_SECONDARY_BORDER});
`;
export const mixinButtonBrandSecondaryStateNormal = css`
  ${mixinButtonBrandSecondaryColorStateNormal}
  ${mixinButtonBrandSecondaryBgStateNormal}
  ${mixinButtonBrandSecondaryBorderStateNormal}
`;
export const mixinButtonBrandSecondaryColorStateHover = css`
  color: var(--kcuf-color-button-brand-secondary-text-hover, ${COLOR.BUTTON_BRAND_SECONDARY_TEXT_HOVER});
`;
export const mixinButtonBrandSecondaryBgStateHover = css`
  background-color: var(--kcuf-color-button-brand-secondary-bg-hover, ${COLOR.BUTTON_BRAND_SECONDARY_BG_HOVER});
`;
export const mixinButtonBrandSecondaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-brand-secondary-border-hover, ${COLOR.BUTTON_BRAND_SECONDARY_BORDER_HOVER});
`;
export const mixinButtonBrandSecondaryStateHover = css`
  ${mixinButtonBrandSecondaryColorStateHover}
  ${mixinButtonBrandSecondaryBgStateHover}
  ${mixinButtonBrandSecondaryBorderStateHover}
`;
export const mixinButtonBrandSecondaryColorStateActive = css`
  color: var(--kcuf-color-button-brand-secondary-text-active, ${COLOR.BUTTON_BRAND_SECONDARY_TEXT_ACTIVE});
`;
export const mixinButtonBrandSecondaryBgStateActive = css`
  background-color: var(--kcuf-color-button-brand-secondary-bg-active, ${COLOR.BUTTON_BRAND_SECONDARY_BG_ACTIVE});
`;
export const mixinButtonBrandSecondaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-brand-secondary-border-active, ${COLOR.BUTTON_BRAND_SECONDARY_BORDER_ACTIVE});
`;
export const mixinButtonBrandSecondaryStateActive = css`
  ${mixinButtonBrandSecondaryColorStateActive}
  ${mixinButtonBrandSecondaryBgStateActive}
  ${mixinButtonBrandSecondaryBorderStateActive}
`;
export const mixinButtonBrandSecondaryColorStateDisabled = css`
  color: var(--kcuf-color-button-brand-secondary-text-disabled, ${COLOR.BUTTON_BRAND_SECONDARY_TEXT_DISABLED});
`;
export const mixinButtonBrandSecondaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-brand-secondary-bg-disabled, ${COLOR.BUTTON_BRAND_SECONDARY_BG_DISABLED});
`;
export const mixinButtonBrandSecondaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-brand-secondary-border-disabled, ${COLOR.BUTTON_BRAND_SECONDARY_BORDER_DISABLED});
`;
export const mixinButtonBrandSecondaryStateDisabled = css`
  ${mixinButtonBrandSecondaryColorStateDisabled}
  ${mixinButtonBrandSecondaryBgStateDisabled}
  ${mixinButtonBrandSecondaryBorderStateDisabled}
`;
export const mixinButtonBrandSecondary = css`
  ${mixinButtonBrandSecondaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonBrandSecondaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonBrandSecondaryStateHover}
  }
  
  &:active {
    ${mixinButtonBrandSecondaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonBrandSecondaryStateDisabled}
  }
`;
export const mixinButtonBrandSecondaryAltColorStateNormal = css`
  color: var(--kcuf-color-button-brand-secondary-alt-text, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT});
`;
export const mixinButtonBrandSecondaryAltBgStateNormal = css`
  background-color: var(--kcuf-color-button-brand-secondary-alt-bg, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG});
`;
export const mixinButtonBrandSecondaryAltBorderStateNormal = css`
  border-color: var(--kcuf-color-button-brand-secondary-alt-border, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER});
`;
export const mixinButtonBrandSecondaryAltStateNormal = css`
  ${mixinButtonBrandSecondaryAltColorStateNormal}
  ${mixinButtonBrandSecondaryAltBgStateNormal}
  ${mixinButtonBrandSecondaryAltBorderStateNormal}
`;
export const mixinButtonBrandSecondaryAltColorStateHover = css`
  color: var(--kcuf-color-button-brand-secondary-alt-text-hover, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT_HOVER});
`;
export const mixinButtonBrandSecondaryAltBgStateHover = css`
  background-color: var(--kcuf-color-button-brand-secondary-alt-bg-hover, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG_HOVER});
`;
export const mixinButtonBrandSecondaryAltBorderStateHover = css`
  border-color: var(--kcuf-color-button-brand-secondary-alt-border-hover, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER_HOVER});
`;
export const mixinButtonBrandSecondaryAltStateHover = css`
  ${mixinButtonBrandSecondaryAltColorStateHover}
  ${mixinButtonBrandSecondaryAltBgStateHover}
  ${mixinButtonBrandSecondaryAltBorderStateHover}
`;
export const mixinButtonBrandSecondaryAltColorStateActive = css`
  color: var(--kcuf-color-button-brand-secondary-alt-text-active, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT_ACTIVE});
`;
export const mixinButtonBrandSecondaryAltBgStateActive = css`
  background-color: var(--kcuf-color-button-brand-secondary-alt-bg-active, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG_ACTIVE});
`;
export const mixinButtonBrandSecondaryAltBorderStateActive = css`
  border-color: var(--kcuf-color-button-brand-secondary-alt-border-active, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER_ACTIVE});
`;
export const mixinButtonBrandSecondaryAltStateActive = css`
  ${mixinButtonBrandSecondaryAltColorStateActive}
  ${mixinButtonBrandSecondaryAltBgStateActive}
  ${mixinButtonBrandSecondaryAltBorderStateActive}
`;
export const mixinButtonBrandSecondaryAltColorStateDisabled = css`
  color: var(--kcuf-color-button-brand-secondary-alt-text-disabled, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT_DISABLED});
`;
export const mixinButtonBrandSecondaryAltBgStateDisabled = css`
  background-color: var(--kcuf-color-button-brand-secondary-alt-bg-disabled, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG_DISABLED});
`;
export const mixinButtonBrandSecondaryAltBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-brand-secondary-alt-border-disabled, ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER_DISABLED});
`;
export const mixinButtonBrandSecondaryAltStateDisabled = css`
  ${mixinButtonBrandSecondaryAltColorStateDisabled}
  ${mixinButtonBrandSecondaryAltBgStateDisabled}
  ${mixinButtonBrandSecondaryAltBorderStateDisabled}
`;
export const mixinButtonBrandSecondaryAlt = css`
  ${mixinButtonBrandSecondaryAltStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonBrandSecondaryAltColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonBrandSecondaryAltStateHover}
  }
  
  &:active {
    ${mixinButtonBrandSecondaryAltStateActive}
  }
  
  &:disabled {
    ${mixinButtonBrandSecondaryAltStateDisabled}
  }
`;
export const mixinButtonBrandTertiaryColorStateNormal = css`
  color: var(--kcuf-color-button-brand-tertiary-text, ${COLOR.BUTTON_BRAND_TERTIARY_TEXT});
`;
export const mixinButtonBrandTertiaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-brand-tertiary-bg, ${COLOR.BUTTON_BRAND_TERTIARY_BG});
`;
export const mixinButtonBrandTertiaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-brand-tertiary-border, ${COLOR.BUTTON_BRAND_TERTIARY_BORDER});
`;
export const mixinButtonBrandTertiaryStateNormal = css`
  ${mixinButtonBrandTertiaryColorStateNormal}
  ${mixinButtonBrandTertiaryBgStateNormal}
  ${mixinButtonBrandTertiaryBorderStateNormal}
`;
export const mixinButtonBrandTertiaryColorStateHover = css`
  color: var(--kcuf-color-button-brand-tertiary-text-hover, ${COLOR.BUTTON_BRAND_TERTIARY_TEXT_HOVER});
`;
export const mixinButtonBrandTertiaryBgStateHover = css`
  background-color: var(--kcuf-color-button-brand-tertiary-bg-hover, ${COLOR.BUTTON_BRAND_TERTIARY_BG_HOVER});
`;
export const mixinButtonBrandTertiaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-brand-tertiary-border-hover, ${COLOR.BUTTON_BRAND_TERTIARY_BORDER_HOVER});
`;
export const mixinButtonBrandTertiaryStateHover = css`
  ${mixinButtonBrandTertiaryColorStateHover}
  ${mixinButtonBrandTertiaryBgStateHover}
  ${mixinButtonBrandTertiaryBorderStateHover}
`;
export const mixinButtonBrandTertiaryColorStateActive = css`
  color: var(--kcuf-color-button-brand-tertiary-text-active, ${COLOR.BUTTON_BRAND_TERTIARY_TEXT_ACTIVE});
`;
export const mixinButtonBrandTertiaryBgStateActive = css`
  background-color: var(--kcuf-color-button-brand-tertiary-bg-active, ${COLOR.BUTTON_BRAND_TERTIARY_BG_ACTIVE});
`;
export const mixinButtonBrandTertiaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-brand-tertiary-border-active, ${COLOR.BUTTON_BRAND_TERTIARY_BORDER_ACTIVE});
`;
export const mixinButtonBrandTertiaryStateActive = css`
  ${mixinButtonBrandTertiaryColorStateActive}
  ${mixinButtonBrandTertiaryBgStateActive}
  ${mixinButtonBrandTertiaryBorderStateActive}
`;
export const mixinButtonBrandTertiaryColorStateDisabled = css`
  color: var(--kcuf-color-button-brand-tertiary-text-disabled, ${COLOR.BUTTON_BRAND_TERTIARY_TEXT_DISABLED});
`;
export const mixinButtonBrandTertiaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-brand-tertiary-bg-disabled, ${COLOR.BUTTON_BRAND_TERTIARY_BG_DISABLED});
`;
export const mixinButtonBrandTertiaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-brand-tertiary-border-disabled, ${COLOR.BUTTON_BRAND_TERTIARY_BORDER_DISABLED});
`;
export const mixinButtonBrandTertiaryStateDisabled = css`
  ${mixinButtonBrandTertiaryColorStateDisabled}
  ${mixinButtonBrandTertiaryBgStateDisabled}
  ${mixinButtonBrandTertiaryBorderStateDisabled}
`;
export const mixinButtonBrandTertiary = css`
  ${mixinButtonBrandTertiaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonBrandTertiaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonBrandTertiaryStateHover}
  }
  
  &:active {
    ${mixinButtonBrandTertiaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonBrandTertiaryStateDisabled}
  }
`;
export const mixinButtonTextPrimaryColorStateNormal = css`
  color: var(--kcuf-color-button-text-primary-text, ${COLOR.BUTTON_TEXT_PRIMARY_TEXT});
`;
export const mixinButtonTextPrimaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-text-primary-bg, ${COLOR.BUTTON_TEXT_PRIMARY_BG});
`;
export const mixinButtonTextPrimaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-text-primary-border, ${COLOR.BUTTON_TEXT_PRIMARY_BORDER});
`;
export const mixinButtonTextPrimaryStateNormal = css`
  ${mixinButtonTextPrimaryColorStateNormal}
  ${mixinButtonTextPrimaryBgStateNormal}
  ${mixinButtonTextPrimaryBorderStateNormal}
`;
export const mixinButtonTextPrimaryColorStateHover = css`
  color: var(--kcuf-color-button-text-primary-text-hover, ${COLOR.BUTTON_TEXT_PRIMARY_TEXT_HOVER});
`;
export const mixinButtonTextPrimaryBgStateHover = css`
  background-color: var(--kcuf-color-button-text-primary-bg-hover, ${COLOR.BUTTON_TEXT_PRIMARY_BG_HOVER});
`;
export const mixinButtonTextPrimaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-text-primary-border-hover, ${COLOR.BUTTON_TEXT_PRIMARY_BORDER_HOVER});
`;
export const mixinButtonTextPrimaryStateHover = css`
  ${mixinButtonTextPrimaryColorStateHover}
  ${mixinButtonTextPrimaryBgStateHover}
  ${mixinButtonTextPrimaryBorderStateHover}
`;
export const mixinButtonTextPrimaryColorStateActive = css`
  color: var(--kcuf-color-button-text-primary-text-active, ${COLOR.BUTTON_TEXT_PRIMARY_TEXT_ACTIVE});
`;
export const mixinButtonTextPrimaryBgStateActive = css`
  background-color: var(--kcuf-color-button-text-primary-bg-active, ${COLOR.BUTTON_TEXT_PRIMARY_BG_ACTIVE});
`;
export const mixinButtonTextPrimaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-text-primary-border-active, ${COLOR.BUTTON_TEXT_PRIMARY_BORDER_ACTIVE});
`;
export const mixinButtonTextPrimaryStateActive = css`
  ${mixinButtonTextPrimaryColorStateActive}
  ${mixinButtonTextPrimaryBgStateActive}
  ${mixinButtonTextPrimaryBorderStateActive}
`;
export const mixinButtonTextPrimaryColorStateDisabled = css`
  color: var(--kcuf-color-button-text-primary-text-disabled, ${COLOR.BUTTON_TEXT_PRIMARY_TEXT_DISABLED});
`;
export const mixinButtonTextPrimaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-text-primary-bg-disabled, ${COLOR.BUTTON_TEXT_PRIMARY_BG_DISABLED});
`;
export const mixinButtonTextPrimaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-text-primary-border-disabled, ${COLOR.BUTTON_TEXT_PRIMARY_BORDER_DISABLED});
`;
export const mixinButtonTextPrimaryStateDisabled = css`
  ${mixinButtonTextPrimaryColorStateDisabled}
  ${mixinButtonTextPrimaryBgStateDisabled}
  ${mixinButtonTextPrimaryBorderStateDisabled}
`;
export const mixinButtonTextPrimary = css`
  ${mixinButtonTextPrimaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTextPrimaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTextPrimaryStateHover}
  }
  
  &:active {
    ${mixinButtonTextPrimaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonTextPrimaryStateDisabled}
  }
`;
export const mixinButtonTextSecondaryColorStateNormal = css`
  color: var(--kcuf-color-button-text-secondary-text, ${COLOR.BUTTON_TEXT_SECONDARY_TEXT});
`;
export const mixinButtonTextSecondaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-text-secondary-bg, ${COLOR.BUTTON_TEXT_SECONDARY_BG});
`;
export const mixinButtonTextSecondaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-text-secondary-border, ${COLOR.BUTTON_TEXT_SECONDARY_BORDER});
`;
export const mixinButtonTextSecondaryStateNormal = css`
  ${mixinButtonTextSecondaryColorStateNormal}
  ${mixinButtonTextSecondaryBgStateNormal}
  ${mixinButtonTextSecondaryBorderStateNormal}
`;
export const mixinButtonTextSecondaryColorStateHover = css`
  color: var(--kcuf-color-button-text-secondary-text-hover, ${COLOR.BUTTON_TEXT_SECONDARY_TEXT_HOVER});
`;
export const mixinButtonTextSecondaryBgStateHover = css`
  background-color: var(--kcuf-color-button-text-secondary-bg-hover, ${COLOR.BUTTON_TEXT_SECONDARY_BG_HOVER});
`;
export const mixinButtonTextSecondaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-text-secondary-border-hover, ${COLOR.BUTTON_TEXT_SECONDARY_BORDER_HOVER});
`;
export const mixinButtonTextSecondaryStateHover = css`
  ${mixinButtonTextSecondaryColorStateHover}
  ${mixinButtonTextSecondaryBgStateHover}
  ${mixinButtonTextSecondaryBorderStateHover}
`;
export const mixinButtonTextSecondaryColorStateActive = css`
  color: var(--kcuf-color-button-text-secondary-text-active, ${COLOR.BUTTON_TEXT_SECONDARY_TEXT_ACTIVE});
`;
export const mixinButtonTextSecondaryBgStateActive = css`
  background-color: var(--kcuf-color-button-text-secondary-bg-active, ${COLOR.BUTTON_TEXT_SECONDARY_BG_ACTIVE});
`;
export const mixinButtonTextSecondaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-text-secondary-border-active, ${COLOR.BUTTON_TEXT_SECONDARY_BORDER_ACTIVE});
`;
export const mixinButtonTextSecondaryStateActive = css`
  ${mixinButtonTextSecondaryColorStateActive}
  ${mixinButtonTextSecondaryBgStateActive}
  ${mixinButtonTextSecondaryBorderStateActive}
`;
export const mixinButtonTextSecondaryColorStateDisabled = css`
  color: var(--kcuf-color-button-text-secondary-text-disabled, ${COLOR.BUTTON_TEXT_SECONDARY_TEXT_DISABLED});
`;
export const mixinButtonTextSecondaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-text-secondary-bg-disabled, ${COLOR.BUTTON_TEXT_SECONDARY_BG_DISABLED});
`;
export const mixinButtonTextSecondaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-text-secondary-border-disabled, ${COLOR.BUTTON_TEXT_SECONDARY_BORDER_DISABLED});
`;
export const mixinButtonTextSecondaryStateDisabled = css`
  ${mixinButtonTextSecondaryColorStateDisabled}
  ${mixinButtonTextSecondaryBgStateDisabled}
  ${mixinButtonTextSecondaryBorderStateDisabled}
`;
export const mixinButtonTextSecondary = css`
  ${mixinButtonTextSecondaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTextSecondaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTextSecondaryStateHover}
  }
  
  &:active {
    ${mixinButtonTextSecondaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonTextSecondaryStateDisabled}
  }
`;
export const mixinButtonTextTertiaryColorStateNormal = css`
  color: var(--kcuf-color-button-text-tertiary-text, ${COLOR.BUTTON_TEXT_TERTIARY_TEXT});
`;
export const mixinButtonTextTertiaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-text-tertiary-bg, ${COLOR.BUTTON_TEXT_TERTIARY_BG});
`;
export const mixinButtonTextTertiaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-text-tertiary-border, ${COLOR.BUTTON_TEXT_TERTIARY_BORDER});
`;
export const mixinButtonTextTertiaryStateNormal = css`
  ${mixinButtonTextTertiaryColorStateNormal}
  ${mixinButtonTextTertiaryBgStateNormal}
  ${mixinButtonTextTertiaryBorderStateNormal}
`;
export const mixinButtonTextTertiaryColorStateHover = css`
  color: var(--kcuf-color-button-text-tertiary-text-hover, ${COLOR.BUTTON_TEXT_TERTIARY_TEXT_HOVER});
`;
export const mixinButtonTextTertiaryBgStateHover = css`
  background-color: var(--kcuf-color-button-text-tertiary-bg-hover, ${COLOR.BUTTON_TEXT_TERTIARY_BG_HOVER});
`;
export const mixinButtonTextTertiaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-text-tertiary-border-hover, ${COLOR.BUTTON_TEXT_TERTIARY_BORDER_HOVER});
`;
export const mixinButtonTextTertiaryStateHover = css`
  ${mixinButtonTextTertiaryColorStateHover}
  ${mixinButtonTextTertiaryBgStateHover}
  ${mixinButtonTextTertiaryBorderStateHover}
`;
export const mixinButtonTextTertiaryColorStateActive = css`
  color: var(--kcuf-color-button-text-tertiary-text-active, ${COLOR.BUTTON_TEXT_TERTIARY_TEXT_ACTIVE});
`;
export const mixinButtonTextTertiaryBgStateActive = css`
  background-color: var(--kcuf-color-button-text-tertiary-bg-active, ${COLOR.BUTTON_TEXT_TERTIARY_BG_ACTIVE});
`;
export const mixinButtonTextTertiaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-text-tertiary-border-active, ${COLOR.BUTTON_TEXT_TERTIARY_BORDER_ACTIVE});
`;
export const mixinButtonTextTertiaryStateActive = css`
  ${mixinButtonTextTertiaryColorStateActive}
  ${mixinButtonTextTertiaryBgStateActive}
  ${mixinButtonTextTertiaryBorderStateActive}
`;
export const mixinButtonTextTertiaryColorStateDisabled = css`
  color: var(--kcuf-color-button-text-tertiary-text-disabled, ${COLOR.BUTTON_TEXT_TERTIARY_TEXT_DISABLED});
`;
export const mixinButtonTextTertiaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-text-tertiary-bg-disabled, ${COLOR.BUTTON_TEXT_TERTIARY_BG_DISABLED});
`;
export const mixinButtonTextTertiaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-text-tertiary-border-disabled, ${COLOR.BUTTON_TEXT_TERTIARY_BORDER_DISABLED});
`;
export const mixinButtonTextTertiaryStateDisabled = css`
  ${mixinButtonTextTertiaryColorStateDisabled}
  ${mixinButtonTextTertiaryBgStateDisabled}
  ${mixinButtonTextTertiaryBorderStateDisabled}
`;
export const mixinButtonTextTertiary = css`
  ${mixinButtonTextTertiaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTextTertiaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTextTertiaryStateHover}
  }
  
  &:active {
    ${mixinButtonTextTertiaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonTextTertiaryStateDisabled}
  }
`;
export const mixinButtonTextBrandPrimaryColorStateNormal = css`
  color: var(--kcuf-color-button-text-brand-primary-text, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT});
`;
export const mixinButtonTextBrandPrimaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-text-brand-primary-bg, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG});
`;
export const mixinButtonTextBrandPrimaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-text-brand-primary-border, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER});
`;
export const mixinButtonTextBrandPrimaryStateNormal = css`
  ${mixinButtonTextBrandPrimaryColorStateNormal}
  ${mixinButtonTextBrandPrimaryBgStateNormal}
  ${mixinButtonTextBrandPrimaryBorderStateNormal}
`;
export const mixinButtonTextBrandPrimaryColorStateHover = css`
  color: var(--kcuf-color-button-text-brand-primary-text-hover, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT_HOVER});
`;
export const mixinButtonTextBrandPrimaryBgStateHover = css`
  background-color: var(--kcuf-color-button-text-brand-primary-bg-hover, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG_HOVER});
`;
export const mixinButtonTextBrandPrimaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-text-brand-primary-border-hover, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER_HOVER});
`;
export const mixinButtonTextBrandPrimaryStateHover = css`
  ${mixinButtonTextBrandPrimaryColorStateHover}
  ${mixinButtonTextBrandPrimaryBgStateHover}
  ${mixinButtonTextBrandPrimaryBorderStateHover}
`;
export const mixinButtonTextBrandPrimaryColorStateActive = css`
  color: var(--kcuf-color-button-text-brand-primary-text-active, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT_ACTIVE});
`;
export const mixinButtonTextBrandPrimaryBgStateActive = css`
  background-color: var(--kcuf-color-button-text-brand-primary-bg-active, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG_ACTIVE});
`;
export const mixinButtonTextBrandPrimaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-text-brand-primary-border-active, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER_ACTIVE});
`;
export const mixinButtonTextBrandPrimaryStateActive = css`
  ${mixinButtonTextBrandPrimaryColorStateActive}
  ${mixinButtonTextBrandPrimaryBgStateActive}
  ${mixinButtonTextBrandPrimaryBorderStateActive}
`;
export const mixinButtonTextBrandPrimaryColorStateDisabled = css`
  color: var(--kcuf-color-button-text-brand-primary-text-disabled, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT_DISABLED});
`;
export const mixinButtonTextBrandPrimaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-text-brand-primary-bg-disabled, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG_DISABLED});
`;
export const mixinButtonTextBrandPrimaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-text-brand-primary-border-disabled, ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER_DISABLED});
`;
export const mixinButtonTextBrandPrimaryStateDisabled = css`
  ${mixinButtonTextBrandPrimaryColorStateDisabled}
  ${mixinButtonTextBrandPrimaryBgStateDisabled}
  ${mixinButtonTextBrandPrimaryBorderStateDisabled}
`;
export const mixinButtonTextBrandPrimary = css`
  ${mixinButtonTextBrandPrimaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTextBrandPrimaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTextBrandPrimaryStateHover}
  }
  
  &:active {
    ${mixinButtonTextBrandPrimaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonTextBrandPrimaryStateDisabled}
  }
`;
export const mixinButtonTextBrandSecondaryColorStateNormal = css`
  color: var(--kcuf-color-button-text-brand-secondary-text, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT});
`;
export const mixinButtonTextBrandSecondaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-text-brand-secondary-bg, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG});
`;
export const mixinButtonTextBrandSecondaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-text-brand-secondary-border, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER});
`;
export const mixinButtonTextBrandSecondaryStateNormal = css`
  ${mixinButtonTextBrandSecondaryColorStateNormal}
  ${mixinButtonTextBrandSecondaryBgStateNormal}
  ${mixinButtonTextBrandSecondaryBorderStateNormal}
`;
export const mixinButtonTextBrandSecondaryColorStateHover = css`
  color: var(--kcuf-color-button-text-brand-secondary-text-hover, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT_HOVER});
`;
export const mixinButtonTextBrandSecondaryBgStateHover = css`
  background-color: var(--kcuf-color-button-text-brand-secondary-bg-hover, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG_HOVER});
`;
export const mixinButtonTextBrandSecondaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-text-brand-secondary-border-hover, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER_HOVER});
`;
export const mixinButtonTextBrandSecondaryStateHover = css`
  ${mixinButtonTextBrandSecondaryColorStateHover}
  ${mixinButtonTextBrandSecondaryBgStateHover}
  ${mixinButtonTextBrandSecondaryBorderStateHover}
`;
export const mixinButtonTextBrandSecondaryColorStateActive = css`
  color: var(--kcuf-color-button-text-brand-secondary-text-active, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT_ACTIVE});
`;
export const mixinButtonTextBrandSecondaryBgStateActive = css`
  background-color: var(--kcuf-color-button-text-brand-secondary-bg-active, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG_ACTIVE});
`;
export const mixinButtonTextBrandSecondaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-text-brand-secondary-border-active, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER_ACTIVE});
`;
export const mixinButtonTextBrandSecondaryStateActive = css`
  ${mixinButtonTextBrandSecondaryColorStateActive}
  ${mixinButtonTextBrandSecondaryBgStateActive}
  ${mixinButtonTextBrandSecondaryBorderStateActive}
`;
export const mixinButtonTextBrandSecondaryColorStateDisabled = css`
  color: var(--kcuf-color-button-text-brand-secondary-text-disabled, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT_DISABLED});
`;
export const mixinButtonTextBrandSecondaryBgStateDisabled = css`
  background-color: var(--kcuf-color-button-text-brand-secondary-bg-disabled, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG_DISABLED});
`;
export const mixinButtonTextBrandSecondaryBorderStateDisabled = css`
  border-color: var(--kcuf-color-button-text-brand-secondary-border-disabled, ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER_DISABLED});
`;
export const mixinButtonTextBrandSecondaryStateDisabled = css`
  ${mixinButtonTextBrandSecondaryColorStateDisabled}
  ${mixinButtonTextBrandSecondaryBgStateDisabled}
  ${mixinButtonTextBrandSecondaryBorderStateDisabled}
`;
export const mixinButtonTextBrandSecondary = css`
  ${mixinButtonTextBrandSecondaryStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTextBrandSecondaryColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTextBrandSecondaryStateHover}
  }
  
  &:active {
    ${mixinButtonTextBrandSecondaryStateActive}
  }
  
  &:disabled {
    ${mixinButtonTextBrandSecondaryStateDisabled}
  }
`;