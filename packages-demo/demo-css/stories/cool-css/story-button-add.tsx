import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const COLOR = '#503af6';
const COLOR_ALT = '#4431d1';

const ScHoverLayer = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 0;
  height: 100%;
  background: ${COLOR};
  transition-delay: 0.1s;
`;
const ScHoverLayer1 = styled(ScHoverLayer)`
  transition: 0.7s;
`;
const ScHoverLayer2 = styled(ScHoverLayer)`
  z-index: 1;
  background: ${COLOR_ALT};
  transition: 0.5s;
`;
const ScCrossCorner = styled.i`
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
    background: ${COLOR};
    transition: 0.3s;
  }
`;
const ScCrossHover = styled.i`
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 8px);
  z-index: 15;
  width: 18px;
  height: 18px;
  
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    opacity: 0;
    background: #fff;
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  
  &::before {
    top: 8px;
    left: 0;
    width: 100%;
    height: 2px;
    transform: translateX(50px) scaleX(0);
    transition-duration: 0.5s;
  }
  
  &::after {
    top: 0;
    left: 8px;
    width: 2px;
    height: 100%;
    transform: translateY(20px) scaleY(0);
    transition-duration: 0.4s;
  }
`;

const ScButtonAdd = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px 24px;
  width: 80px;
  border-color: ${COLOR};
  border-right: 2px solid ${COLOR};
  border-bottom: 2px solid ${COLOR};
  outline: none;
  color: ${COLOR};
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  user-select: none;
  
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    background: ${COLOR};
    transition: 0.5s;
  }
  
  &::before {
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;
  }
  
  &::after {
    top: 0;
    right: 0;
    width: calc(100% - 17px);
    height: 2px;
  }
  
  &:hover {
    ${ScHoverLayer} {
      width: 100%;
      transition-delay: 0s;
    }
    
    ${ScCrossCorner} {
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -10px 0 -10px 8px;
        width: 2px;
        height: 20px;
        background: ${COLOR};
      }
      
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: 0 -1px;
        width: 2px;
        height: 20px;
        background: ${COLOR};
      }
    }
    
    ${ScCrossHover} {
      &::after,
      &::before {
        opacity: 1;
        transform: none;
        transition-delay: 0.2s;
      }
      
      &::after {
        transition-duration: 0.6s;
      }
    }
  }
`;

// 参考 https://codepen.io/Danil89/pen/KvKRyG
export default function StoryButtonAdd(): ReactElement {
  return <ScButtonAdd className="bt more-bt">
    <ScHoverLayer1 />
    <ScHoverLayer2 />
    <ScCrossCorner />
    <ScCrossHover />
    <>add</></ScButtonAdd>;
}
