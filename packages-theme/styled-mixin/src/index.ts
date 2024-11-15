import {
  css
} from 'styled-components';

interface IEllipsisLinesProps {
  $lines: number;
  $lineHeight: number;
  $max?: boolean;
}

/**
 * 对按钮样式进行重置：
 *
 * 1. 去掉 padding、background、border，定义 outline 以防止丑陋的 Chrome focus outline 样式
 * 2. 设置字体（family、颜色、大小、行间距等）继承
 * 3. 避免 link hover 的样式干扰
 * 4. 定义 disabled 的基础样式
 */
export const mixinResetButton = css`
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

export const mixinResetInput = css`
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid transparent;
  outline: none;
  transition: all ease-in-out 0.3s;
  
  &::-ms-clear {
    display: none;
  }
`;

export const mixinWordWrap = css`
  white-space: pre-wrap;
  word-break: break-word;
`;

// 你需要为之设定一个宽度
export const mixinEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const mixinEllipsisLines = css<IEllipsisLinesProps>`
  /* stylelint-disable */
  display: -webkit-box;
  line-height: ${props => props.$lineHeight}px;
  overflow: hidden;
  -webkit-line-clamp: ${props => props.$lines};
  -webkit-box-orient: vertical;
  ${props => {
  const h = props.$lineHeight * props.$lines;
  
  return props.$max ? css`
      max-height: ${h}px;
    ` : css`
      height: ${h}px;
    `;
}}
`;
