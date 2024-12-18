import {
  NamedExoticComponent
} from 'react';
import {
  createGlobalStyle
} from 'styled-components';

import {
  ThemeColors,
  ThemeTypo,
  ThemeSize
} from '../var';

interface ITheme {
  COLOR: ThemeColors;
  TYPO: ThemeTypo;
  SIZE: ThemeSize;
}

export default function createThemeGlobalStyle({
  COLOR,
  TYPO,
  SIZE
}: ITheme): NamedExoticComponent { // eslint-disable-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createGlobalStyle<any>`
    :root {
      --kcuf-color-text-transparent: ${COLOR.TEXT_TRANSPARENT};
      --kcuf-color-text-white: ${COLOR.TEXT_WHITE};
      --kcuf-color-text-black: ${COLOR.TEXT_BLACK};
      --kcuf-color-text-inverse: ${COLOR.TEXT_INVERSE};
      --kcuf-color-text-brand: ${COLOR.TEXT_BRAND};
      --kcuf-color-text-brand-hover: ${COLOR.TEXT_BRAND_HOVER};
      --kcuf-color-text-brand-active: ${COLOR.TEXT_BRAND_ACTIVE};
      --kcuf-color-text-accent: ${COLOR.TEXT_ACCENT};
      --kcuf-color-text-accent-hover: ${COLOR.TEXT_ACCENT_HOVER};
      --kcuf-color-text-accent-active: ${COLOR.TEXT_ACCENT_ACTIVE};
      --kcuf-color-text-primary: ${COLOR.TEXT_PRIMARY};
      --kcuf-color-text-secondary: ${COLOR.TEXT_SECONDARY};
      --kcuf-color-text-tertiary: ${COLOR.TEXT_TERTIARY};
      --kcuf-color-text-disabled: ${COLOR.TEXT_DISABLED};
      --kcuf-color-text-help: ${COLOR.TEXT_HELP};
      --kcuf-color-text-info: ${COLOR.TEXT_INFO};
      --kcuf-color-text-success: ${COLOR.TEXT_SUCCESS};
      --kcuf-color-text-warning: ${COLOR.TEXT_WARNING};
      --kcuf-color-text-error: ${COLOR.TEXT_ERROR};
      --kcuf-color-text-danger: ${COLOR.TEXT_DANGER};
      --kcuf-color-text-emphasis: ${COLOR.TEXT_EMPHASIS};
      --kcuf-color-text-code: ${COLOR.TEXT_CODE};
      --kcuf-color-bg-transparent: ${COLOR.BG_TRANSPARENT};
      --kcuf-color-bg-white: ${COLOR.BG_WHITE};
      --kcuf-color-bg-black: ${COLOR.BG_BLACK};
      --kcuf-color-bg-inverse: ${COLOR.BG_INVERSE};
      --kcuf-color-bg-brand: ${COLOR.BG_BRAND};
      --kcuf-color-bg-brand-hover: ${COLOR.BG_BRAND_HOVER};
      --kcuf-color-bg-brand-active: ${COLOR.BG_BRAND_ACTIVE};
      --kcuf-color-bg-accent: ${COLOR.BG_ACCENT};
      --kcuf-color-bg-accent-hover: ${COLOR.BG_ACCENT_HOVER};
      --kcuf-color-bg-accent-active: ${COLOR.BG_ACCENT_ACTIVE};
      --kcuf-color-bg-primary: ${COLOR.BG_PRIMARY};
      --kcuf-color-bg-secondary: ${COLOR.BG_SECONDARY};
      --kcuf-color-bg-secondary-fade: ${COLOR.BG_SECONDARY_FADE};
      --kcuf-color-bg-tertiary: ${COLOR.BG_TERTIARY};
      --kcuf-color-bg-tertiary-fade: ${COLOR.BG_TERTIARY_FADE};
      --kcuf-color-bg-disabled: ${COLOR.BG_DISABLED};
      --kcuf-color-bg-help: ${COLOR.BG_HELP};
      --kcuf-color-bg-help-tint: ${COLOR.BG_HELP_TINT};
      --kcuf-color-bg-help-tint-fade: ${COLOR.BG_HELP_TINT_FADE};
      --kcuf-color-bg-info: ${COLOR.BG_INFO};
      --kcuf-color-bg-info-tint: ${COLOR.BG_INFO_TINT};
      --kcuf-color-bg-info-tint-fade: ${COLOR.BG_INFO_TINT_FADE};
      --kcuf-color-bg-success: ${COLOR.BG_SUCCESS};
      --kcuf-color-bg-success-tint: ${COLOR.BG_SUCCESS_TINT};
      --kcuf-color-bg-success-tint-fade: ${COLOR.BG_SUCCESS_TINT_FADE};
      --kcuf-color-bg-warning: ${COLOR.BG_WARNING};
      --kcuf-color-bg-warning-tint: ${COLOR.BG_WARNING_TINT};
      --kcuf-color-bg-warning-tint-fade: ${COLOR.BG_WARNING_TINT_FADE};
      --kcuf-color-bg-error: ${COLOR.BG_ERROR};
      --kcuf-color-bg-error-tint: ${COLOR.BG_ERROR_TINT};
      --kcuf-color-bg-error-tint-fade: ${COLOR.BG_ERROR_TINT_FADE};
      --kcuf-color-bg-danger: ${COLOR.BG_DANGER};
      --kcuf-color-bg-backdrop: ${COLOR.BG_BACKDROP};
      --kcuf-color-border-transparent: ${COLOR.BORDER_TRANSPARENT};
      --kcuf-color-border-white: ${COLOR.BORDER_WHITE};
      --kcuf-color-border-brand: ${COLOR.BORDER_BRAND};
      --kcuf-color-border-brand-hover: ${COLOR.BORDER_BRAND_HOVER};
      --kcuf-color-border-brand-active: ${COLOR.BORDER_BRAND_ACTIVE};
      --kcuf-color-border-accent: ${COLOR.BORDER_ACCENT};
      --kcuf-color-border-accent-hover: ${COLOR.BORDER_ACCENT_HOVER};
      --kcuf-color-border-accent-active: ${COLOR.BORDER_ACCENT_ACTIVE};
      --kcuf-color-border-primary: ${COLOR.BORDER_PRIMARY};
      --kcuf-color-border-secondary: ${COLOR.BORDER_SECONDARY};
      --kcuf-color-border-tertiary: ${COLOR.BORDER_TERTIARY};
      --kcuf-color-border-disabled: ${COLOR.BORDER_DISABLED};
      --kcuf-color-border-help: ${COLOR.BORDER_HELP};
      --kcuf-color-border-info: ${COLOR.BORDER_INFO};
      --kcuf-color-border-success: ${COLOR.BORDER_SUCCESS};
      --kcuf-color-border-warning: ${COLOR.BORDER_WARNING};
      --kcuf-color-border-error: ${COLOR.BORDER_ERROR};
      --kcuf-color-border-danger: ${COLOR.BORDER_DANGER};
      --kcuf-color-shadow: ${COLOR.SHADOW};
      --kcuf-color-link-primary: ${COLOR.LINK_PRIMARY};
      --kcuf-color-link-primary-visited: ${COLOR.LINK_PRIMARY_VISITED};
      --kcuf-color-link-primary-hover: ${COLOR.LINK_PRIMARY_HOVER};
      --kcuf-color-link-primary-active: ${COLOR.LINK_PRIMARY_ACTIVE};
      --kcuf-color-link-secondary: ${COLOR.LINK_SECONDARY};
      --kcuf-color-link-secondary-visited: ${COLOR.LINK_SECONDARY_VISITED};
      --kcuf-color-link-secondary-hover: ${COLOR.LINK_SECONDARY_HOVER};
      --kcuf-color-link-secondary-active: ${COLOR.LINK_SECONDARY_ACTIVE};
      --kcuf-color-link-tertiary: ${COLOR.LINK_TERTIARY};
      --kcuf-color-link-tertiary-visited: ${COLOR.LINK_TERTIARY_VISITED};
      --kcuf-color-link-tertiary-hover: ${COLOR.LINK_TERTIARY_HOVER};
      --kcuf-color-link-tertiary-active: ${COLOR.LINK_TERTIARY_ACTIVE};
      --kcuf-color-link-brand: ${COLOR.LINK_BRAND};
      --kcuf-color-link-brand-visited: ${COLOR.LINK_BRAND_VISITED};
      --kcuf-color-link-brand-hover: ${COLOR.LINK_BRAND_HOVER};
      --kcuf-color-link-brand-active: ${COLOR.LINK_BRAND_ACTIVE};
      --kcuf-color-link-brand-secondary: ${COLOR.LINK_BRAND_SECONDARY};
      --kcuf-color-link-brand-secondary-visited: ${COLOR.LINK_BRAND_SECONDARY_VISITED};
      --kcuf-color-link-brand-secondary-hover: ${COLOR.LINK_BRAND_SECONDARY_HOVER};
      --kcuf-color-link-brand-secondary-active: ${COLOR.LINK_BRAND_SECONDARY_ACTIVE};
      --kcuf-color-link-disabled: ${COLOR.LINK_DISABLED};
      --kcuf-color-input-text: ${COLOR.INPUT_TEXT};
      --kcuf-color-input-bg: ${COLOR.INPUT_BG};
      --kcuf-color-input-border: ${COLOR.INPUT_BORDER};
      --kcuf-color-input-text-hover: ${COLOR.INPUT_TEXT_HOVER};
      --kcuf-color-input-bg-hover: ${COLOR.INPUT_BG_HOVER};
      --kcuf-color-input-border-hover: ${COLOR.INPUT_BORDER_HOVER};
      --kcuf-color-input-text-focus: ${COLOR.INPUT_TEXT_FOCUS};
      --kcuf-color-input-bg-focus: ${COLOR.INPUT_BG_FOCUS};
      --kcuf-color-input-border-focus: ${COLOR.INPUT_BORDER_FOCUS};
      --kcuf-color-input-border-focus-brand: ${COLOR.INPUT_BORDER_FOCUS_BRAND};
      --kcuf-color-input-text-disabled: ${COLOR.INPUT_TEXT_DISABLED};
      --kcuf-color-input-bg-disabled: ${COLOR.INPUT_BG_DISABLED};
      --kcuf-color-input-border-disabled: ${COLOR.INPUT_BORDER_DISABLED};
      --kcuf-color-input-placeholder: ${COLOR.INPUT_PLACEHOLDER};
      --kcuf-color-button-menu-text: ${COLOR.BUTTON_MENU_TEXT};
      --kcuf-color-button-menu-bg: ${COLOR.BUTTON_MENU_BG};
      --kcuf-color-button-menu-border: ${COLOR.BUTTON_MENU_BORDER};
      --kcuf-color-button-menu-text-hover: ${COLOR.BUTTON_MENU_TEXT_HOVER};
      --kcuf-color-button-menu-bg-hover: ${COLOR.BUTTON_MENU_BG_HOVER};
      --kcuf-color-button-menu-border-hover: ${COLOR.BUTTON_MENU_BORDER_HOVER};
      --kcuf-color-button-menu-text-active: ${COLOR.BUTTON_MENU_TEXT_ACTIVE};
      --kcuf-color-button-menu-bg-active: ${COLOR.BUTTON_MENU_BG_ACTIVE};
      --kcuf-color-button-menu-border-active: ${COLOR.BUTTON_MENU_BORDER_ACTIVE};
      --kcuf-color-button-menu-text-disabled: ${COLOR.BUTTON_MENU_TEXT_DISABLED};
      --kcuf-color-button-menu-bg-disabled: ${COLOR.BUTTON_MENU_BG_DISABLED};
      --kcuf-color-button-menu-border-disabled: ${COLOR.BUTTON_MENU_BORDER_DISABLED};
      --kcuf-color-button-danger-text: ${COLOR.BUTTON_DANGER_TEXT};
      --kcuf-color-button-danger-bg: ${COLOR.BUTTON_DANGER_BG};
      --kcuf-color-button-danger-border: ${COLOR.BUTTON_DANGER_BORDER};
      --kcuf-color-button-danger-text-hover: ${COLOR.BUTTON_DANGER_TEXT_HOVER};
      --kcuf-color-button-danger-bg-hover: ${COLOR.BUTTON_DANGER_BG_HOVER};
      --kcuf-color-button-danger-border-hover: ${COLOR.BUTTON_DANGER_BORDER_HOVER};
      --kcuf-color-button-danger-text-active: ${COLOR.BUTTON_DANGER_TEXT_ACTIVE};
      --kcuf-color-button-danger-bg-active: ${COLOR.BUTTON_DANGER_BG_ACTIVE};
      --kcuf-color-button-danger-border-active: ${COLOR.BUTTON_DANGER_BORDER_ACTIVE};
      --kcuf-color-button-danger-text-disabled: ${COLOR.BUTTON_DANGER_TEXT_DISABLED};
      --kcuf-color-button-danger-bg-disabled: ${COLOR.BUTTON_DANGER_BG_DISABLED};
      --kcuf-color-button-danger-border-disabled: ${COLOR.BUTTON_DANGER_BORDER_DISABLED};
      --kcuf-color-button-primary-text: ${COLOR.BUTTON_PRIMARY_TEXT};
      --kcuf-color-button-primary-bg: ${COLOR.BUTTON_PRIMARY_BG};
      --kcuf-color-button-primary-border: ${COLOR.BUTTON_PRIMARY_BORDER};
      --kcuf-color-button-primary-text-hover: ${COLOR.BUTTON_PRIMARY_TEXT_HOVER};
      --kcuf-color-button-primary-bg-hover: ${COLOR.BUTTON_PRIMARY_BG_HOVER};
      --kcuf-color-button-primary-border-hover: ${COLOR.BUTTON_PRIMARY_BORDER_HOVER};
      --kcuf-color-button-primary-text-active: ${COLOR.BUTTON_PRIMARY_TEXT_ACTIVE};
      --kcuf-color-button-primary-bg-active: ${COLOR.BUTTON_PRIMARY_BG_ACTIVE};
      --kcuf-color-button-primary-border-active: ${COLOR.BUTTON_PRIMARY_BORDER_ACTIVE};
      --kcuf-color-button-primary-text-disabled: ${COLOR.BUTTON_PRIMARY_TEXT_DISABLED};
      --kcuf-color-button-primary-bg-disabled: ${COLOR.BUTTON_PRIMARY_BG_DISABLED};
      --kcuf-color-button-primary-border-disabled: ${COLOR.BUTTON_PRIMARY_BORDER_DISABLED};
      --kcuf-color-button-secondary-text: ${COLOR.BUTTON_SECONDARY_TEXT};
      --kcuf-color-button-secondary-bg: ${COLOR.BUTTON_SECONDARY_BG};
      --kcuf-color-button-secondary-border: ${COLOR.BUTTON_SECONDARY_BORDER};
      --kcuf-color-button-secondary-text-hover: ${COLOR.BUTTON_SECONDARY_TEXT_HOVER};
      --kcuf-color-button-secondary-bg-hover: ${COLOR.BUTTON_SECONDARY_BG_HOVER};
      --kcuf-color-button-secondary-border-hover: ${COLOR.BUTTON_SECONDARY_BORDER_HOVER};
      --kcuf-color-button-secondary-text-active: ${COLOR.BUTTON_SECONDARY_TEXT_ACTIVE};
      --kcuf-color-button-secondary-bg-active: ${COLOR.BUTTON_SECONDARY_BG_ACTIVE};
      --kcuf-color-button-secondary-border-active: ${COLOR.BUTTON_SECONDARY_BORDER_ACTIVE};
      --kcuf-color-button-secondary-text-disabled: ${COLOR.BUTTON_SECONDARY_TEXT_DISABLED};
      --kcuf-color-button-secondary-bg-disabled: ${COLOR.BUTTON_SECONDARY_BG_DISABLED};
      --kcuf-color-button-secondary-border-disabled: ${COLOR.BUTTON_SECONDARY_BORDER_DISABLED};
      --kcuf-color-button-secondary-alt-text: ${COLOR.BUTTON_SECONDARY_ALT_TEXT};
      --kcuf-color-button-secondary-alt-bg: ${COLOR.BUTTON_SECONDARY_ALT_BG};
      --kcuf-color-button-secondary-alt-border: ${COLOR.BUTTON_SECONDARY_ALT_BORDER};
      --kcuf-color-button-secondary-alt-text-hover: ${COLOR.BUTTON_SECONDARY_ALT_TEXT_HOVER};
      --kcuf-color-button-secondary-alt-bg-hover: ${COLOR.BUTTON_SECONDARY_ALT_BG_HOVER};
      --kcuf-color-button-secondary-alt-border-hover: ${COLOR.BUTTON_SECONDARY_ALT_BORDER_HOVER};
      --kcuf-color-button-secondary-alt-text-active: ${COLOR.BUTTON_SECONDARY_ALT_TEXT_ACTIVE};
      --kcuf-color-button-secondary-alt-bg-active: ${COLOR.BUTTON_SECONDARY_ALT_BG_ACTIVE};
      --kcuf-color-button-secondary-alt-border-active: ${COLOR.BUTTON_SECONDARY_ALT_BORDER_ACTIVE};
      --kcuf-color-button-secondary-alt-text-disabled: ${COLOR.BUTTON_SECONDARY_ALT_TEXT_DISABLED};
      --kcuf-color-button-secondary-alt-bg-disabled: ${COLOR.BUTTON_SECONDARY_ALT_BG_DISABLED};
      --kcuf-color-button-secondary-alt-border-disabled: ${COLOR.BUTTON_SECONDARY_ALT_BORDER_DISABLED};
      --kcuf-color-button-tertiary-text: ${COLOR.BUTTON_TERTIARY_TEXT};
      --kcuf-color-button-tertiary-bg: ${COLOR.BUTTON_TERTIARY_BG};
      --kcuf-color-button-tertiary-border: ${COLOR.BUTTON_TERTIARY_BORDER};
      --kcuf-color-button-tertiary-text-hover: ${COLOR.BUTTON_TERTIARY_TEXT_HOVER};
      --kcuf-color-button-tertiary-bg-hover: ${COLOR.BUTTON_TERTIARY_BG_HOVER};
      --kcuf-color-button-tertiary-border-hover: ${COLOR.BUTTON_TERTIARY_BORDER_HOVER};
      --kcuf-color-button-tertiary-text-active: ${COLOR.BUTTON_TERTIARY_TEXT_ACTIVE};
      --kcuf-color-button-tertiary-bg-active: ${COLOR.BUTTON_TERTIARY_BG_ACTIVE};
      --kcuf-color-button-tertiary-border-active: ${COLOR.BUTTON_TERTIARY_BORDER_ACTIVE};
      --kcuf-color-button-tertiary-text-disabled: ${COLOR.BUTTON_TERTIARY_TEXT_DISABLED};
      --kcuf-color-button-tertiary-bg-disabled: ${COLOR.BUTTON_TERTIARY_BG_DISABLED};
      --kcuf-color-button-tertiary-border-disabled: ${COLOR.BUTTON_TERTIARY_BORDER_DISABLED};
      --kcuf-color-button-tertiary-alt-text: ${COLOR.BUTTON_TERTIARY_ALT_TEXT};
      --kcuf-color-button-tertiary-alt-bg: ${COLOR.BUTTON_TERTIARY_ALT_BG};
      --kcuf-color-button-tertiary-alt-border: ${COLOR.BUTTON_TERTIARY_ALT_BORDER};
      --kcuf-color-button-tertiary-alt-text-hover: ${COLOR.BUTTON_TERTIARY_ALT_TEXT_HOVER};
      --kcuf-color-button-tertiary-alt-bg-hover: ${COLOR.BUTTON_TERTIARY_ALT_BG_HOVER};
      --kcuf-color-button-tertiary-alt-border-hover: ${COLOR.BUTTON_TERTIARY_ALT_BORDER_HOVER};
      --kcuf-color-button-tertiary-alt-text-active: ${COLOR.BUTTON_TERTIARY_ALT_TEXT_ACTIVE};
      --kcuf-color-button-tertiary-alt-bg-active: ${COLOR.BUTTON_TERTIARY_ALT_BG_ACTIVE};
      --kcuf-color-button-tertiary-alt-border-active: ${COLOR.BUTTON_TERTIARY_ALT_BORDER_ACTIVE};
      --kcuf-color-button-tertiary-alt-text-disabled: ${COLOR.BUTTON_TERTIARY_ALT_TEXT_DISABLED};
      --kcuf-color-button-tertiary-alt-bg-disabled: ${COLOR.BUTTON_TERTIARY_ALT_BG_DISABLED};
      --kcuf-color-button-tertiary-alt-border-disabled: ${COLOR.BUTTON_TERTIARY_ALT_BORDER_DISABLED};
      --kcuf-color-button-brand-primary-text: ${COLOR.BUTTON_BRAND_PRIMARY_TEXT};
      --kcuf-color-button-brand-primary-bg: ${COLOR.BUTTON_BRAND_PRIMARY_BG};
      --kcuf-color-button-brand-primary-border: ${COLOR.BUTTON_BRAND_PRIMARY_BORDER};
      --kcuf-color-button-brand-primary-text-hover: ${COLOR.BUTTON_BRAND_PRIMARY_TEXT_HOVER};
      --kcuf-color-button-brand-primary-bg-hover: ${COLOR.BUTTON_BRAND_PRIMARY_BG_HOVER};
      --kcuf-color-button-brand-primary-border-hover: ${COLOR.BUTTON_BRAND_PRIMARY_BORDER_HOVER};
      --kcuf-color-button-brand-primary-text-active: ${COLOR.BUTTON_BRAND_PRIMARY_TEXT_ACTIVE};
      --kcuf-color-button-brand-primary-bg-active: ${COLOR.BUTTON_BRAND_PRIMARY_BG_ACTIVE};
      --kcuf-color-button-brand-primary-border-active: ${COLOR.BUTTON_BRAND_PRIMARY_BORDER_ACTIVE};
      --kcuf-color-button-brand-primary-text-disabled: ${COLOR.BUTTON_BRAND_PRIMARY_TEXT_DISABLED};
      --kcuf-color-button-brand-primary-bg-disabled: ${COLOR.BUTTON_BRAND_PRIMARY_BG_DISABLED};
      --kcuf-color-button-brand-primary-border-disabled: ${COLOR.BUTTON_BRAND_PRIMARY_BORDER_DISABLED};
      --kcuf-color-button-brand-secondary-text: ${COLOR.BUTTON_BRAND_SECONDARY_TEXT};
      --kcuf-color-button-brand-secondary-bg: ${COLOR.BUTTON_BRAND_SECONDARY_BG};
      --kcuf-color-button-brand-secondary-border: ${COLOR.BUTTON_BRAND_SECONDARY_BORDER};
      --kcuf-color-button-brand-secondary-text-hover: ${COLOR.BUTTON_BRAND_SECONDARY_TEXT_HOVER};
      --kcuf-color-button-brand-secondary-bg-hover: ${COLOR.BUTTON_BRAND_SECONDARY_BG_HOVER};
      --kcuf-color-button-brand-secondary-border-hover: ${COLOR.BUTTON_BRAND_SECONDARY_BORDER_HOVER};
      --kcuf-color-button-brand-secondary-text-active: ${COLOR.BUTTON_BRAND_SECONDARY_TEXT_ACTIVE};
      --kcuf-color-button-brand-secondary-bg-active: ${COLOR.BUTTON_BRAND_SECONDARY_BG_ACTIVE};
      --kcuf-color-button-brand-secondary-border-active: ${COLOR.BUTTON_BRAND_SECONDARY_BORDER_ACTIVE};
      --kcuf-color-button-brand-secondary-text-disabled: ${COLOR.BUTTON_BRAND_SECONDARY_TEXT_DISABLED};
      --kcuf-color-button-brand-secondary-bg-disabled: ${COLOR.BUTTON_BRAND_SECONDARY_BG_DISABLED};
      --kcuf-color-button-brand-secondary-border-disabled: ${COLOR.BUTTON_BRAND_SECONDARY_BORDER_DISABLED};
      --kcuf-color-button-brand-secondary-alt-text: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT};
      --kcuf-color-button-brand-secondary-alt-bg: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG};
      --kcuf-color-button-brand-secondary-alt-border: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER};
      --kcuf-color-button-brand-secondary-alt-text-hover: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT_HOVER};
      --kcuf-color-button-brand-secondary-alt-bg-hover: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG_HOVER};
      --kcuf-color-button-brand-secondary-alt-border-hover: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER_HOVER};
      --kcuf-color-button-brand-secondary-alt-text-active: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT_ACTIVE};
      --kcuf-color-button-brand-secondary-alt-bg-active: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG_ACTIVE};
      --kcuf-color-button-brand-secondary-alt-border-active: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER_ACTIVE};
      --kcuf-color-button-brand-secondary-alt-text-disabled: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_TEXT_DISABLED};
      --kcuf-color-button-brand-secondary-alt-bg-disabled: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BG_DISABLED};
      --kcuf-color-button-brand-secondary-alt-border-disabled: ${COLOR.BUTTON_BRAND_SECONDARY_ALT_BORDER_DISABLED};
      --kcuf-color-button-brand-tertiary-text: ${COLOR.BUTTON_BRAND_TERTIARY_TEXT};
      --kcuf-color-button-brand-tertiary-bg: ${COLOR.BUTTON_BRAND_TERTIARY_BG};
      --kcuf-color-button-brand-tertiary-border: ${COLOR.BUTTON_BRAND_TERTIARY_BORDER};
      --kcuf-color-button-brand-tertiary-text-hover: ${COLOR.BUTTON_BRAND_TERTIARY_TEXT_HOVER};
      --kcuf-color-button-brand-tertiary-bg-hover: ${COLOR.BUTTON_BRAND_TERTIARY_BG_HOVER};
      --kcuf-color-button-brand-tertiary-border-hover: ${COLOR.BUTTON_BRAND_TERTIARY_BORDER_HOVER};
      --kcuf-color-button-brand-tertiary-text-active: ${COLOR.BUTTON_BRAND_TERTIARY_TEXT_ACTIVE};
      --kcuf-color-button-brand-tertiary-bg-active: ${COLOR.BUTTON_BRAND_TERTIARY_BG_ACTIVE};
      --kcuf-color-button-brand-tertiary-border-active: ${COLOR.BUTTON_BRAND_TERTIARY_BORDER_ACTIVE};
      --kcuf-color-button-brand-tertiary-text-disabled: ${COLOR.BUTTON_BRAND_TERTIARY_TEXT_DISABLED};
      --kcuf-color-button-brand-tertiary-bg-disabled: ${COLOR.BUTTON_BRAND_TERTIARY_BG_DISABLED};
      --kcuf-color-button-brand-tertiary-border-disabled: ${COLOR.BUTTON_BRAND_TERTIARY_BORDER_DISABLED};
      --kcuf-color-button-text-primary-text: ${COLOR.BUTTON_TEXT_PRIMARY_TEXT};
      --kcuf-color-button-text-primary-bg: ${COLOR.BUTTON_TEXT_PRIMARY_BG};
      --kcuf-color-button-text-primary-border: ${COLOR.BUTTON_TEXT_PRIMARY_BORDER};
      --kcuf-color-button-text-primary-text-hover: ${COLOR.BUTTON_TEXT_PRIMARY_TEXT_HOVER};
      --kcuf-color-button-text-primary-bg-hover: ${COLOR.BUTTON_TEXT_PRIMARY_BG_HOVER};
      --kcuf-color-button-text-primary-border-hover: ${COLOR.BUTTON_TEXT_PRIMARY_BORDER_HOVER};
      --kcuf-color-button-text-primary-text-active: ${COLOR.BUTTON_TEXT_PRIMARY_TEXT_ACTIVE};
      --kcuf-color-button-text-primary-bg-active: ${COLOR.BUTTON_TEXT_PRIMARY_BG_ACTIVE};
      --kcuf-color-button-text-primary-border-active: ${COLOR.BUTTON_TEXT_PRIMARY_BORDER_ACTIVE};
      --kcuf-color-button-text-primary-text-disabled: ${COLOR.BUTTON_TEXT_PRIMARY_TEXT_DISABLED};
      --kcuf-color-button-text-primary-bg-disabled: ${COLOR.BUTTON_TEXT_PRIMARY_BG_DISABLED};
      --kcuf-color-button-text-primary-border-disabled: ${COLOR.BUTTON_TEXT_PRIMARY_BORDER_DISABLED};
      --kcuf-color-button-text-secondary-text: ${COLOR.BUTTON_TEXT_SECONDARY_TEXT};
      --kcuf-color-button-text-secondary-bg: ${COLOR.BUTTON_TEXT_SECONDARY_BG};
      --kcuf-color-button-text-secondary-border: ${COLOR.BUTTON_TEXT_SECONDARY_BORDER};
      --kcuf-color-button-text-secondary-text-hover: ${COLOR.BUTTON_TEXT_SECONDARY_TEXT_HOVER};
      --kcuf-color-button-text-secondary-bg-hover: ${COLOR.BUTTON_TEXT_SECONDARY_BG_HOVER};
      --kcuf-color-button-text-secondary-border-hover: ${COLOR.BUTTON_TEXT_SECONDARY_BORDER_HOVER};
      --kcuf-color-button-text-secondary-text-active: ${COLOR.BUTTON_TEXT_SECONDARY_TEXT_ACTIVE};
      --kcuf-color-button-text-secondary-bg-active: ${COLOR.BUTTON_TEXT_SECONDARY_BG_ACTIVE};
      --kcuf-color-button-text-secondary-border-active: ${COLOR.BUTTON_TEXT_SECONDARY_BORDER_ACTIVE};
      --kcuf-color-button-text-secondary-text-disabled: ${COLOR.BUTTON_TEXT_SECONDARY_TEXT_DISABLED};
      --kcuf-color-button-text-secondary-bg-disabled: ${COLOR.BUTTON_TEXT_SECONDARY_BG_DISABLED};
      --kcuf-color-button-text-secondary-border-disabled: ${COLOR.BUTTON_TEXT_SECONDARY_BORDER_DISABLED};
      --kcuf-color-button-text-tertiary-text: ${COLOR.BUTTON_TEXT_TERTIARY_TEXT};
      --kcuf-color-button-text-tertiary-bg: ${COLOR.BUTTON_TEXT_TERTIARY_BG};
      --kcuf-color-button-text-tertiary-border: ${COLOR.BUTTON_TEXT_TERTIARY_BORDER};
      --kcuf-color-button-text-tertiary-text-hover: ${COLOR.BUTTON_TEXT_TERTIARY_TEXT_HOVER};
      --kcuf-color-button-text-tertiary-bg-hover: ${COLOR.BUTTON_TEXT_TERTIARY_BG_HOVER};
      --kcuf-color-button-text-tertiary-border-hover: ${COLOR.BUTTON_TEXT_TERTIARY_BORDER_HOVER};
      --kcuf-color-button-text-tertiary-text-active: ${COLOR.BUTTON_TEXT_TERTIARY_TEXT_ACTIVE};
      --kcuf-color-button-text-tertiary-bg-active: ${COLOR.BUTTON_TEXT_TERTIARY_BG_ACTIVE};
      --kcuf-color-button-text-tertiary-border-active: ${COLOR.BUTTON_TEXT_TERTIARY_BORDER_ACTIVE};
      --kcuf-color-button-text-tertiary-text-disabled: ${COLOR.BUTTON_TEXT_TERTIARY_TEXT_DISABLED};
      --kcuf-color-button-text-tertiary-bg-disabled: ${COLOR.BUTTON_TEXT_TERTIARY_BG_DISABLED};
      --kcuf-color-button-text-tertiary-border-disabled: ${COLOR.BUTTON_TEXT_TERTIARY_BORDER_DISABLED};
      --kcuf-color-button-text-brand-primary-text: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT};
      --kcuf-color-button-text-brand-primary-bg: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG};
      --kcuf-color-button-text-brand-primary-border: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER};
      --kcuf-color-button-text-brand-primary-text-hover: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT_HOVER};
      --kcuf-color-button-text-brand-primary-bg-hover: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG_HOVER};
      --kcuf-color-button-text-brand-primary-border-hover: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER_HOVER};
      --kcuf-color-button-text-brand-primary-text-active: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT_ACTIVE};
      --kcuf-color-button-text-brand-primary-bg-active: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG_ACTIVE};
      --kcuf-color-button-text-brand-primary-border-active: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER_ACTIVE};
      --kcuf-color-button-text-brand-primary-text-disabled: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_TEXT_DISABLED};
      --kcuf-color-button-text-brand-primary-bg-disabled: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BG_DISABLED};
      --kcuf-color-button-text-brand-primary-border-disabled: ${COLOR.BUTTON_TEXT_BRAND_PRIMARY_BORDER_DISABLED};
      --kcuf-color-button-text-brand-secondary-text: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT};
      --kcuf-color-button-text-brand-secondary-bg: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG};
      --kcuf-color-button-text-brand-secondary-border: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER};
      --kcuf-color-button-text-brand-secondary-text-hover: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT_HOVER};
      --kcuf-color-button-text-brand-secondary-bg-hover: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG_HOVER};
      --kcuf-color-button-text-brand-secondary-border-hover: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER_HOVER};
      --kcuf-color-button-text-brand-secondary-text-active: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT_ACTIVE};
      --kcuf-color-button-text-brand-secondary-bg-active: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG_ACTIVE};
      --kcuf-color-button-text-brand-secondary-border-active: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER_ACTIVE};
      --kcuf-color-button-text-brand-secondary-text-disabled: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_TEXT_DISABLED};
      --kcuf-color-button-text-brand-secondary-bg-disabled: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BG_DISABLED};
      --kcuf-color-button-text-brand-secondary-border-disabled: ${COLOR.BUTTON_TEXT_BRAND_SECONDARY_BORDER_DISABLED};
      --kcuf-typo-font-family-base: ${TYPO.FONT_FAMILY_BASE};
      --kcuf-typo-font-family-base-ja: ${TYPO.FONT_FAMILY_BASE_JA};
      --kcuf-typo-font-family-monospace: ${TYPO.FONT_FAMILY_MONOSPACE};
      --kcuf-size-border-radius-xs: ${SIZE.BORDER_RADIUS_XS}px;
      --kcuf-size-border-radius-s: ${SIZE.BORDER_RADIUS_S}px;
      --kcuf-size-border-radius-m: ${SIZE.BORDER_RADIUS_M}px;
      --kcuf-size-border-radius-l: ${SIZE.BORDER_RADIUS_L}px;
      --kcuf-size-border-radius-xl: ${SIZE.BORDER_RADIUS_XL}px;
    }
  `;
}