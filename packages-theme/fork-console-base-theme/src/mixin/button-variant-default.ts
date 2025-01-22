import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

export const mixinButtonDefaultColorStateNormal = css`
  color: var(--kcuf-color-button-secondary-alt-text, ${COLOR.BUTTON_DEFAULT_TEXT});
`;
export const mixinButtonDefaultBgStateNormal = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg, ${COLOR.BUTTON_DEFAULT_BG});
`;
export const mixinButtonDefaultBorderStateNormal = css`
  border-color: var(--kcuf-color-button-secondary-alt-border, ${COLOR.BUTTON_DEFAULT_BORDER});
`;
export const mixinButtonDefaultStateNormal = css`
  ${mixinButtonDefaultColorStateNormal}
  ${mixinButtonDefaultBgStateNormal}
  ${mixinButtonDefaultBorderStateNormal}
`;
export const mixinButtonDefaultColorStateHover = css`
  color: var(--kcuf-color-button-secondary-alt-text-hover, ${COLOR.BUTTON_DEFAULT_TEXT_HOVER});
`;
export const mixinButtonDefaultBgStateHover = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg-hover, ${COLOR.BUTTON_DEFAULT_BG_HOVER});
`;
export const mixinButtonDefaultBorderStateHover = css`
  border-color: var(--kcuf-color-button-secondary-alt-border-hover, ${COLOR.BUTTON_DEFAULT_BORDER_HOVER});
`;
export const mixinButtonDefaultStateHover = css`
  ${mixinButtonDefaultColorStateHover}
  ${mixinButtonDefaultBgStateHover}
  ${mixinButtonDefaultBorderStateHover}
`;
export const mixinButtonDefaultColorStateActive = css`
  color: var(--kcuf-color-button-secondary-alt-text-active, ${COLOR.BUTTON_DEFAULT_TEXT_ACTIVE});
`;
export const mixinButtonDefaultBgStateActive = css`
  background-color: var(--kcuf-color-button-secondary-alt-bg-active, ${COLOR.BUTTON_DEFAULT_BG_ACTIVE});
`;
export const mixinButtonDefaultBorderStateActive = css`
  border-color: var(--kcuf-color-button-secondary-alt-border-active, ${COLOR.BUTTON_DEFAULT_BORDER_ACTIVE});
`;
export const mixinButtonDefaultStateActive = css`
  ${mixinButtonDefaultColorStateActive}
  ${mixinButtonDefaultBgStateActive}
  ${mixinButtonDefaultBorderStateActive}
`;
export const mixinButtonDefault = css`
  ${mixinButtonDefaultStateNormal}
  
  &:link,
  &:visited {
    ${mixinButtonDefaultColorStateNormal}
  }
  
  &:hover {
    ${mixinButtonDefaultStateHover}
  }
  
  &:active {
    ${mixinButtonDefaultStateActive}
  }
`;
