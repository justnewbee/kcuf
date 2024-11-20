import {
  css
} from 'styled-components';

export const CSS_FONT_FAMILY = css`
  font-family: 'PingFang SC', 'Hiragino Sans GB', Helvetica, Arial, sans-serif;
`;

export const CSS_HEADING = css`
  position: relative;
  margin: 1.5em 0 1em;
  border-bottom: 1px solid hsl(0 0% 95%);
  font-weight: 400;
  line-height: 2.4;
  ${CSS_FONT_FAMILY}
  
  &::before {
    display: inline-block;
    position: relative;
    top: 1px;
    margin-right: 8px;
    width: 36px;
    font-weight: 400;
    color: hsl(0 0% 100%);
    text-align: center;
  }
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CSS_EM = css`
  font-style: normal;
  color: hsl(24 100% 50%);
`;

export const CSS_STRONG = css`
  font-weight: 600;
`;

export const CSS_CODE = css`
  padding: 0 4px;
  background-color: hsl(0 0% 0% / 4%);
  border-radius: 2px;
  color: hsl(210 100% 60%);
`;

export const CSS_KBD = css`
  display: inline-block;
  margin: 0 0.1em;
  padding: 0.1em 0.6em;
  background-color: hsl(204 13% 92%);
  border: 1px solid hsl(212 19% 81%);
  border-radius: 3px;
  box-shadow: 0 1px 0 hsl(0 8% 5% / 20%), 0 0 0 2px hsl(0 0% 100%) inset;
  font: 600 11px/1.4 Arial, 'Helvetica Neue', Helvetica, sans-serif;
  color: hsl(0 0% 20%);
  white-space: pre-wrap;
`;

export const CSS_INLINE_ELEMENTS_INSIDE = css`
  em {
    ${CSS_EM}
  }
  
  strong {
    ${CSS_STRONG}
  }
  
  code {
    ${CSS_CODE}
  }
  
  kbd {
    ${CSS_KBD}
  }
`;

/**
 * 对 block 元素极其内部的 inline 元素增加统一的样式
 */
export const CSS_BLOCK_LEVEL_ELEMENT = css`
  margin: 1em 0 0.5em;
  line-height: 1.5;
  ${CSS_FONT_FAMILY}
  ${CSS_INLINE_ELEMENTS_INSIDE}
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;
