import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScLeftTopCross = styled.i`
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 10;
  transition: 0.5s;
  
  &::before {
    transform: rotate(90deg);
  }
  
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px -1px;
    width: 2px;
    height: 20px;
    background: #503af6;
    transition: 0.3s;
  }
`;
const ScHoverLayer = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 0;
  height: 100%;
  background: #503af6;
  transition-delay: 0.1s;
`;
const ScHoverLayer1 = styled(ScHoverLayer)`
  transition: 0.7s;
`;
const ScHoverLayer2 = styled(ScHoverLayer)`
  z-index: 1;
  background: #4431D1;
  transition: 0.5s;
`;
const ScCrossHover = styled.i`

`;

const ScButtonAdd = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 17px 29px 15px 31px;
  width: 100px;
  border-color: #503af6;
  border-right: 2px solid #503af6;
  border-bottom: 2px solid #503af6;
  outline: none;
  color: #503af6;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
  
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    background: #503af6;
    transition: 0.5s;
  }
  
  &::before {
    bottom: 0;
    left: 0;
    width: 2px;
    height: calc(100% - 17px);
  }
  
  &::after {
    top: 0;
    right: 0;
    width: calc(100% - 17px);
    height: 2px;
  }
  
  &:hover ${ScLeftTopCross}::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 -1px;
    width: 2px;
    height: 20px;
    background: #503af6;
  }
  
  &:hover ${ScLeftTopCross}::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px 0 -10px 8px;
    width: 2px;
    height: 20px;
    background: #503af6;
  }
  
  &::before,
  &:hover::before {
    height: 100%;
  }
  
  &:hover ${ScHoverLayer} {
    width: 100%;
    transition-delay: 0s;
  }
  
  .cross {
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    z-index: 15;
    width: 18px;
    height: 18px;
  }
  
  .cross::before {
    top: 8px;
    left: 0;
    width: 100%;
    height: 2px;
    transform: translateX(50px) scaleX(0);
  }
  
  &:hover .cross::before,
  .cross::before {
    transition-duration: 0.5s;
  }
  
  &:hover .cross::after,
  &:hover .cross::before,
  .cross::after,
  .cross::before {
    opacity: 1;
    transform: none;
    transition-delay: 0.2s;
  }
  
  .cross::after {
    top: 0;
    left: 8px;
    width: 2px;
    height: 100%;
    transform: translateY(20px) scaleY(0);
    transition-duration: 0.4s;
  }
  
  .cross::before,
  .cross::after {
    content: '';
    display: block;
    position: absolute;
    opacity: 0;
    background: #fff;
    transition-delay: 0s;
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    transition-duration: 0.3s;
  }
  
  &:hover .cross::after,
  &:hover .cross::before {
    opacity: 1;
    transform: none;
    transition-delay: 0.2s;
  }
  
  &:hover .cross::after {
    transition-duration: 0.6s;
  }
`;

// 参考 https://codepen.io/Danil89/pen/KvKRyG
export default function StoryButtonAdd(): ReactElement {
  return <ScButtonAdd className="bt more-bt">
    <ScLeftTopCross />
    <ScHoverLayer1 />
    <ScHoverLayer2 />
    <span className="cross" />
    <span>add</span>
  </ScButtonAdd>;
}
