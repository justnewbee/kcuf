import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const gold = '#DAA25A';
const cubicBezier = 'cubic-bezier(0.2, 0.3, 0.25, 0.9)';

const ScButtonMortar = styled.button`
  display: inline-flex;
  position: relative;
  margin: 0;
  padding: 0.875em 1.42em;
  background-color: transparent;
  border: 0;
  color: ${gold};
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 1.4;
  letter-spacing: 4px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ${cubicBezier} 0s;
  
  // The bottom border
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 80%;
    height: 1px;
    background: ${gold};
    transform: translateX(-50%);
    transition: width 0.2s ${cubicBezier} 0.4s, background 0.2s ${cubicBezier} 0s;
  }
  
  // The left/right/top borders
  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.2s ${cubicBezier};
    
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      background: ${gold};
      transition: transform 0.2s ${cubicBezier};
    }
    
    // Left & Right Border
    &:first-child {
      height: 100%;
      
      &::before, &::after {
        bottom: 0;
        width: 1px;
        height: 100%;
        transform: scale3d(1, 0, 1);
        transform-origin: bottom center;
        transition: transform 0.2s ${cubicBezier} 0.2s, background 0.2s ${cubicBezier} 0s;
      }
      
      &::before {
        left: 0;
      }
      
      &::after {
        right: 0;
      }
    }
    
    // Top Borders
    &:last-child {
      width: 100%;
      height: 1px;
      
      &::before {
        left: 0;
        transform-origin: bottom left;
      }
      
      &::after {
        right: 0;
        transform-origin: bottom right;
      }
      
      // Scale them down with scale3d to prevent jittering
      
      &::before, &::after {
        bottom: 0;
        width: 100%;
        height: 1px;
        transform: scale3d(0, 1, 1);
        transition: transform 0.2s ${cubicBezier} 0s, background 0.2s ${cubicBezier} 0s;
      }
    }
  }
  
  // The Magic! Animate Border Drawing on Hover
  &:hover {
    opacity: 1;
    outline: 0;
    text-decoration: none;
    transition: color 0.2s ${cubicBezier} 0s;
    
    // Positioning
    &::after {
      width: 100%;
      background: #232F39;
      transition: width 0.2s ${cubicBezier} 0s, background 0.2s ${cubicBezier} 0s;
    }
    
    span {
      &:first-child {
        // The scale3d is what grows the element
        
        &::before, &::after {
          background: #232F39;
          transform: scale3d(1, 1, 1);
          transition: transform 0.2s ${cubicBezier} 0.2s, background 0.2s ${cubicBezier} 0s;
        }
      }
      
      &:last-child {
        &::before, &::after {
          background: #232F39;
          transform: scale3d(1, 1, 1);
          transition: transform 0.2s ${cubicBezier} 0.4s, background 0.2s ${cubicBezier} 0s;
        }
      }
    }
  }
  
  // Click-down styles
  &:focus {
    background: #232F39;
    color: white !important;
    transition: all 0.2s ${cubicBezier};
    
    &::after {
      opacity: 0;
    }
  }
`;

// 参考 https://codepen.io/dylanbaumann/pen/yewbaQ
export default function StoryButtonMortar(): ReactElement {
  return <ScButtonMortar>
    Learn More
    <span />
    <span />
  </ScButtonMortar>;
}
