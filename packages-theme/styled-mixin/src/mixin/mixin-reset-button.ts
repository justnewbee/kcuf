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
  
  &:hover,
  &:link:hover {
    text-decoration: none;
  }
  
  &[disabled] {
    cursor: not-allowed;
  }
`;