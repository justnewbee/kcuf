import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

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
`;
