import {
  css
} from 'styled-components';

export const CSS_FONT_FAMILY = css`
  font-family: 'PingFang SC', 'Hiragino Sans GB', Helvetica, Arial, sans-serif;
`;

export const CSS_HEADING = css`
  position: relative;
  margin: 1.5em 0 1em 0;
  font-weight: 400;
  line-height: 2.4;
  
  ${CSS_FONT_FAMILY}
  &::before {
    display: inline-block;
    margin-right: 8px;
    width: 36px;
    font-weight: 200;
    text-align: center;
    color: hsl(0 0% 100%);
  }
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CSS_INLINE_ELEMENTS_INSIDE = css`
  em {
    font-style: normal;
    color: hsl(24 100% 50%);
  }
  
  code {
    padding: 0 4px;
    border-radius: 2px;
    background-color: hsl(0 0% 0% / 4%);
    color: hsl(210 100% 60%);
  }
  
  strong {
    font-weight: 600;
  }
  
  kbd {
    display: inline-block;
    margin: 0 0.1em;
    padding: 0.1em 0.6em;
    border: 1px solid hsl(212 19% 81%);
    border-radius: 3px;
    box-shadow: 0 1px 0 hsl(0 8% 5% / 20%), 0 0 0 2px hsl(0 0% 100%) inset;
    background-color: hsl(204 13% 92%);
    font: 600 11px/1.4 Arial, 'Helvetica Neue', Helvetica, sans-serif;
    white-space: pre-wrap;
    color: hsl(0 0% 20%);
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
