import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

export const mixinInputText = css`
  color: var(--kcuf-color-input-text, ${COLOR.INPUT_TEXT});
`;
export const mixinInputBg = css`
  background-color: var(--kcuf-color-input-bg, ${COLOR.INPUT_BG});
`;
export const mixinInputBorder = css`
  border-color: var(--kcuf-color-input-border, ${COLOR.INPUT_BORDER});
`;
export const mixinInputTextHover = css`
  color: var(--kcuf-color-input-text-hover, ${COLOR.INPUT_TEXT_HOVER});
`;
export const mixinInputBgHover = css`
  background-color: var(--kcuf-color-input-bg-hover, ${COLOR.INPUT_BG_HOVER});
`;
export const mixinInputBorderHover = css`
  border-color: var(--kcuf-color-input-border-hover, ${COLOR.INPUT_BORDER_HOVER});
`;
export const mixinInputTextFocus = css`
  color: var(--kcuf-color-input-text-focus, ${COLOR.INPUT_TEXT_FOCUS});
`;
export const mixinInputBgFocus = css`
  background-color: var(--kcuf-color-input-bg-focus, ${COLOR.INPUT_BG_FOCUS});
`;
export const mixinInputBorderFocus = css`
  border-color: var(--kcuf-color-input-border-focus, ${COLOR.INPUT_BORDER_FOCUS});
`;
export const mixinInputBorderFocusBrand = css`
  border-color: var(--kcuf-color-input-border-focus-brand, ${COLOR.INPUT_BORDER_FOCUS_BRAND});
`;
export const mixinInputTextDisabled = css`
  color: var(--kcuf-color-input-text-disabled, ${COLOR.INPUT_TEXT_DISABLED});
`;
export const mixinInputBgDisabled = css`
  background-color: var(--kcuf-color-input-bg-disabled, ${COLOR.INPUT_BG_DISABLED});
`;
export const mixinInputBorderDisabled = css`
  border-color: var(--kcuf-color-input-border-disabled, ${COLOR.INPUT_BORDER_DISABLED});
`;
