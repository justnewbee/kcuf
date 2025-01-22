import {
  css
} from 'styled-components';

/**
 * 对按钮样式进行重置：
 *
 * 1. 去掉 padding、background、border，定义 outline 以防止丑陋的 Chrome focus outline 样式
 * 2. 设置字体（family、颜色、大小、行间距等）继承
 * 3. 避免 link hover 的样式干扰
 * 4. 定义 disabled 的基础样式
 */
export default css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  max-width: 100%;
  background: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  text-decoration: none;
  line-height: inherit;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  
  &:focus-visible {
    outline-offset: 1px;
    transition: outline-offset ease-out 0.2s;
  }
  
  &:hover,
  &:link:hover {
    text-decoration: none;
  }
  
  &[disabled] {
    cursor: not-allowed;
  }
`;
