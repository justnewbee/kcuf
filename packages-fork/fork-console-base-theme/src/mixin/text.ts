import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

export const mixinTextTransparent = css`
  color: var(--kcuf-color-text-transparent, ${COLOR.TEXT_TRANSPARENT});
`;
export const mixinTextWhite = css`
  color: var(--kcuf-color-text-white, ${COLOR.TEXT_WHITE});
`;
export const mixinTextBlack = css`
  color: var(--kcuf-color-text-black, ${COLOR.TEXT_BLACK});
`;
export const mixinTextInverse = css`
  color: var(--kcuf-color-text-inverse, ${COLOR.TEXT_INVERSE});
`;
export const mixinTextBrand = css`
  color: var(--kcuf-color-text-brand, ${COLOR.TEXT_BRAND});
`;
export const mixinTextBrandHover = css`
  color: var(--kcuf-color-text-brand-hover, ${COLOR.TEXT_BRAND_HOVER});
`;
export const mixinTextBrandActive = css`
  color: var(--kcuf-color-text-brand-active, ${COLOR.TEXT_BRAND_ACTIVE});
`;
export const mixinTextAccent = css`
  color: var(--kcuf-color-text-accent, ${COLOR.TEXT_ACCENT});
`;
export const mixinTextAccentHover = css`
  color: var(--kcuf-color-text-accent-hover, ${COLOR.TEXT_ACCENT_HOVER});
`;
export const mixinTextAccentActive = css`
  color: var(--kcuf-color-text-accent-active, ${COLOR.TEXT_ACCENT_ACTIVE});
`;
export const mixinTextPrimary = css`
  color: var(--kcuf-color-text-primary, ${COLOR.TEXT_PRIMARY});
`;
export const mixinTextSecondary = css`
  color: var(--kcuf-color-text-secondary, ${COLOR.TEXT_SECONDARY});
`;
export const mixinTextTertiary = css`
  color: var(--kcuf-color-text-tertiary, ${COLOR.TEXT_TERTIARY});
`;
export const mixinTextDisabled = css`
  color: var(--kcuf-color-text-disabled, ${COLOR.TEXT_DISABLED});
`;
export const mixinTextHelp = css`
  color: var(--kcuf-color-text-help, ${COLOR.TEXT_HELP});
`;
export const mixinTextInfo = css`
  color: var(--kcuf-color-text-info, ${COLOR.TEXT_INFO});
`;
export const mixinTextSuccess = css`
  color: var(--kcuf-color-text-success, ${COLOR.TEXT_SUCCESS});
`;
export const mixinTextWarning = css`
  color: var(--kcuf-color-text-warning, ${COLOR.TEXT_WARNING});
`;
export const mixinTextError = css`
  color: var(--kcuf-color-text-error, ${COLOR.TEXT_ERROR});
`;
export const mixinTextDanger = css`
  color: var(--kcuf-color-text-danger, ${COLOR.TEXT_DANGER});
`;
export const mixinTextEmphasis = css`
  color: var(--kcuf-color-text-emphasis, ${COLOR.TEXT_EMPHASIS});
`;
export const mixinTextCode = css`
  color: var(--kcuf-color-text-code, ${COLOR.TEXT_CODE});
`;
