import {
  ReactElement
} from 'react';
import styled, {
  createGlobalStyle
} from 'styled-components';

// @property 必须注册在全局，styled-components 组件内写可能解析失败
export const GlobalGradientAngle = createGlobalStyle`
  @property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  
  @keyframes spin-border {
    to {
      --gradient-angle: 360deg;
    }
  }
`;

export const ShimmerButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  background: linear-gradient(#0f0f13, #0f0f13) padding-box, linear-gradient(#6b7280, #6b7280) border-box; /* 默认边框色 */
  border: 2px solid transparent;
  border-radius: 999px;
  color: #e4e4e7; /* 对应 --text-primary */
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    background: linear-gradient(#0f0f13, #0f0f13) padding-box,
      conic-gradient(
        from var(--gradient-angle),
        #8a64e5,
        #6d98cc,
        #2a1373,
        #8a64e5
      ) border-box;
    color: #fff;
    animation: spin-border 3s linear infinite;
  }
`;

export default function ButtonSpinBorder(): ReactElement {
  return <>
    <GlobalGradientAngle />
    <ShimmerButton href="#contribute">Get involved</ShimmerButton>
  </>;
}
