import {
  css
} from 'styled-components';

import {
  COLOR
} from '../var';

export const mixinInputReset = css`
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid transparent;
  outline: none;
  transition: all ease-in-out 0.3s;
  
  &::placeholder {
    font-size: 12px;
    font-weight: 200;
    color: var(--kcuf-color-input-placeholder, ${COLOR.INPUT_PLACEHOLDER});
  }
  
  &::-ms-clear {
    display: none;
  }
`;

/**
 * 对按钮样式进行重置：
 *
 * 1. 去掉 padding、background、border，定义 outline 以防止丑陋的 Chrome focus outline 样式
 * 2. 设置字体（family、颜色、大小、行间距等）继承
 * 3. 避免 link hover 的样式干扰
 * 4. 定义 disabled 的基础样式
 */
export const mixinButtonReset = css`
  padding: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  text-align: center;
  text-decoration: none;
  line-height: inherit;
  background: none;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  transition: all ease-out 0.3s;
  
  &:focus-visible {
    outline: 1px solid ${COLOR.BORDER_ACCENT_HOVER};
  }
  
  &:hover,
  &:link:hover {
    text-decoration: none;
  }
  
  &[disabled] {
    cursor: not-allowed;
  }
`;
