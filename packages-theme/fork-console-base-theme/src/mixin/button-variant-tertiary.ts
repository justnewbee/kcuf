import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

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
`;
