import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

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
`;
