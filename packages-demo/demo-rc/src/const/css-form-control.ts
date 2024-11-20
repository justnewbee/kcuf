import {
  css
} from 'styled-components';

import {
  COLOR_FORM_CONTROL,
  COLOR_FORM_CONTROL_DARK
} from './color-rc';
import {
  PADDING_FORM_CONTROL_HORIZONTAL,
  HEIGHT_FORM_CONTROL
} from './sizing';
import {
  CSS_FONT_FAMILY
} from './css-common';

const CSS_FORM_CONTROL_OVERRIDE_TEXTAREA = css`
  display: block;
  width: 100%;
  min-height: 100px;
  line-height: 1.8;
  resize: vertical;
`;

const CSS_FORM_CONTROL_OVERRIDE_BUTTON = css`
  min-width: 60px;
  background-color: ${COLOR_FORM_CONTROL.BGC};
  border-radius: 4px;
  cursor: pointer;
  
  .theme-dark & {
    background-color: ${COLOR_FORM_CONTROL_DARK.BGC};
  }
  
  &:hover {
    background-color: ${COLOR_FORM_CONTROL.BGC_HOVER};
    box-shadow: 0 4px 8px hsl(0 0% 0% / 10%);
    
    .theme-dark & {
      background-color: ${COLOR_FORM_CONTROL_DARK.BGC_HOVER};
    }
  }
  
  &:active {
    background-color: ${COLOR_FORM_CONTROL.BGC_ACTIVE};
    box-shadow: none;
    
    .theme-dark & {
      background-color: ${COLOR_FORM_CONTROL_DARK.BGC_ACTIVE};
    }
  }
  
  &[disabled],
  &[disabled]:hover,
  &[disabled]:active,
  &[disabled]:focus {
    background-color: ${COLOR_FORM_CONTROL.BGC_DISABLED};
    border-color: ${COLOR_FORM_CONTROL.BDC_DISABLED};
    box-shadow: none;
    color: ${COLOR_FORM_CONTROL.FGC_DISABLED};
    cursor: default;
    
    .theme-dark & {
      background-color: ${COLOR_FORM_CONTROL_DARK.BGC_DISABLED};
      border-color: ${COLOR_FORM_CONTROL_DARK.BDC_DISABLED};
      color: ${COLOR_FORM_CONTROL_DARK.FGC_DISABLED};
    }
  }
`;

export const CSS_FORM_CONTROL_BASE = css`
  border: 1px solid ${COLOR_FORM_CONTROL.BDC};
  box-sizing: border-box;
  color: ${COLOR_FORM_CONTROL.FGC};
  font-size: 11px;
  line-height: ${HEIGHT_FORM_CONTROL}px;
  transition: all 0.3s ease-in-out;
  ${CSS_FONT_FAMILY}
  
  .theme-dark & {
    background-color: ${COLOR_FORM_CONTROL_DARK.BGC};
    border-color: ${COLOR_FORM_CONTROL_DARK.BDC};
    color: ${COLOR_FORM_CONTROL_DARK.FGC};
  }
  
  &:hover {
    border-color: ${COLOR_FORM_CONTROL.BDC_HOVER};
    
    .theme-dark & {
      border-color: ${COLOR_FORM_CONTROL_DARK.BDC_HOVER};
    }
  }
  
  &:focus {
    border-color: ${COLOR_FORM_CONTROL.BDC_FOCUS};
    outline: none;
    
    .theme-dark & {
      border-color: ${COLOR_FORM_CONTROL_DARK.BDC_FOCUS};
    }
  }
  
  &:active {
    border-color: ${COLOR_FORM_CONTROL.BDC_ACTIVE};
    
    .theme-dark & {
      border-color: ${COLOR_FORM_CONTROL_DARK.BDC_ACTIVE};
    }
  }
  
  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus {
    background-color: ${COLOR_FORM_CONTROL.BGC_DISABLED};
    border-color: ${COLOR_FORM_CONTROL.BDC_DISABLED};
    color: ${COLOR_FORM_CONTROL.FGC_DISABLED};
    
    .theme-dark & {
      background-color: ${COLOR_FORM_CONTROL_DARK.BGC_DISABLED};
      border-color: ${COLOR_FORM_CONTROL_DARK.BDC_DISABLED};
      color: ${COLOR_FORM_CONTROL_DARK.FGC_DISABLED};
    }
  }
`;

export const CSS_FORM_CONTROL_INPUT_BASE = css`
  margin: 1px 1px 1px 0;
  padding: 0 ${PADDING_FORM_CONTROL_HORIZONTAL}px;
  ${CSS_FORM_CONTROL_BASE}
`;

export const CSS_FORM_CONTROL_INPUT_TEXTAREA = css`
  margin: 1px 1px 1px 0;
  padding: 4px ${PADDING_FORM_CONTROL_HORIZONTAL}px;
  ${CSS_FORM_CONTROL_BASE}
  ${CSS_FORM_CONTROL_OVERRIDE_TEXTAREA}
`;

export const CSS_FORM_CONTROL_BUTTON = css`
  margin: 1px 1px 1px 0;
  padding: 0 ${PADDING_FORM_CONTROL_HORIZONTAL}px;
  ${CSS_FORM_CONTROL_BASE}
  ${CSS_FORM_CONTROL_OVERRIDE_BUTTON}
`;
