import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

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
`;
