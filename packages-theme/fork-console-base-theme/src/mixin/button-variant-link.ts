import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

export const mixinButtonTextPrimaryColorStateNormal = css`
  color: var(--kcuf-color-button-link-text, ${COLOR.BUTTON_LINK_TEXT});
`;
export const mixinButtonTextPrimaryBgStateNormal = css`
  background-color: var(--kcuf-color-button-link-bg, ${COLOR.BUTTON_LINK_BG});
`;
export const mixinButtonTextPrimaryBorderStateNormal = css`
  border-color: var(--kcuf-color-button-link-border, ${COLOR.BUTTON_LINK_BORDER});
`;
export const mixinButtonTextPrimaryStateNormal = css`
  ${mixinButtonTextPrimaryColorStateNormal}
  ${mixinButtonTextPrimaryBgStateNormal}
  ${mixinButtonTextPrimaryBorderStateNormal}
`;
export const mixinButtonTextPrimaryColorStateHover = css`
  color: var(--kcuf-color-button-link-text-hover, ${COLOR.BUTTON_LINK_TEXT_HOVER});
`;
export const mixinButtonTextPrimaryBgStateHover = css`
  background-color: var(--kcuf-color-button-link-bg-hover, ${COLOR.BUTTON_LINK_BG_HOVER});
`;
export const mixinButtonTextPrimaryBorderStateHover = css`
  border-color: var(--kcuf-color-button-link-border-hover, ${COLOR.BUTTON_LINK_BORDER_HOVER});
`;
export const mixinButtonTextPrimaryStateHover = css`
  ${mixinButtonTextPrimaryColorStateHover}
  ${mixinButtonTextPrimaryBgStateHover}
  ${mixinButtonTextPrimaryBorderStateHover}
`;
export const mixinButtonTextPrimaryColorStateActive = css`
  color: var(--kcuf-color-button-link-text-active, ${COLOR.BUTTON_LINK_TEXT_ACTIVE});
`;
export const mixinButtonTextPrimaryBgStateActive = css`
  background-color: var(--kcuf-color-button-link-bg-active, ${COLOR.BUTTON_LINK_BG_ACTIVE});
`;
export const mixinButtonTextPrimaryBorderStateActive = css`
  border-color: var(--kcuf-color-button-link-border-active, ${COLOR.BUTTON_LINK_BORDER_ACTIVE});
`;
export const mixinButtonTextPrimaryStateActive = css`
  ${mixinButtonTextPrimaryColorStateActive}
  ${mixinButtonTextPrimaryBgStateActive}
  ${mixinButtonTextPrimaryBorderStateActive}
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
`;
