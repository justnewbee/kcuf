import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

export const mixinButtonTextColorStateNormal = css`
  color: var(--kcuf-color-button-text-text, ${COLOR.BUTTON_TEXT_TEXT});
`;
export const mixinButtonTextBgStateNormal = css`
  background-color: var(--kcuf-color-button-text-bg, ${COLOR.BUTTON_TEXT_BG});
`;
export const mixinButtonTextBorderStateNormal = css`
  border-color: var(--kcuf-color-button-text-border, ${COLOR.BUTTON_TEXT_BORDER});
`;
export const mixinButtonTextStateNormal = css`
  ${mixinButtonTextColorStateNormal}
  ${mixinButtonTextBgStateNormal}
  ${mixinButtonTextBorderStateNormal}
`;
export const mixinButtonTextColorStateHover = css`
  color: var(--kcuf-color-button-text-text-hover, ${COLOR.BUTTON_TEXT_TEXT_HOVER});
`;
export const mixinButtonTextBgStateHover = css`
  background-color: var(--kcuf-color-button-text-bg-hover, ${COLOR.BUTTON_TEXT_BG_HOVER});
`;
export const mixinButtonTextBorderStateHover = css`
  border-color: var(--kcuf-color-button-text-border-hover, ${COLOR.BUTTON_TEXT_BORDER_HOVER});
`;
export const mixinButtonTextStateHover = css`
  ${mixinButtonTextColorStateHover}
  ${mixinButtonTextBgStateHover}
  ${mixinButtonTextBorderStateHover}
`;
export const mixinButtonTextColorStateActive = css`
  color: var(--kcuf-color-button-text-text-active, ${COLOR.BUTTON_TEXT_TEXT_ACTIVE});
`;
export const mixinButtonTextBgStateActive = css`
  background-color: var(--kcuf-color-button-text-bg-active, ${COLOR.BUTTON_TEXT_BG_ACTIVE});
`;
export const mixinButtonTextBorderStateActive = css`
  border-color: var(--kcuf-color-button-text-border-active, ${COLOR.BUTTON_TEXT_BORDER_ACTIVE});
`;
export const mixinButtonTextStateActive = css`
  ${mixinButtonTextColorStateActive}
  ${mixinButtonTextBgStateActive}
  ${mixinButtonTextBorderStateActive}
`;
export const mixinButtonText = css`
  ${mixinButtonTextStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonTextColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonTextStateHover}
  }
  
  &:active {
    ${mixinButtonTextStateActive}
  }
`;
