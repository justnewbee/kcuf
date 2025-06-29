import {
  ReactElement
} from 'react';
import styled from 'styled-components';

const ScGlowingBorderAni = styled.div`
  @property --a {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  
  @property --i {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }
  
  img {
    --_s: (90deg -mod(var(--a), .5turn)) * 9999;
    
    margin: 12px;
    padding: 10px;
    width: 230px;
    aspect-ratio: 1;
    background: #ccc;
    border: 5px solid #0000;
    border-radius: 30px;
    cursor: pointer;
    mask: conic-gradient(#000 0 0) content-box,
          linear-gradient(calc(var(--_a, 45deg) + mod(var(--a), 90deg) * var(--i) + clamp(-90deg * var(--i), (90deg - mod(var(--a), 180deg)) * 9999, 0deg)), #0000 30%, #000 40% 60%, #0000 70%) subtract,
          conic-gradient(#000 0 0) padding-box;
    transition: --i .3s, --a 0s .3s;
  }
  
  img.alt {
    --_a: -45deg;
  }
  
  img:hover {
    --i: 1;
    --a: 15turn;
    
    transition: --i 0s, --a 30s linear;
  }
`;

// 参考自 https://css-tip.com/glowing-border
export default function StoryGlowingBorderAni(): ReactElement {
  return <ScGlowingBorderAni>
    <img src="https://picsum.photos/id/65/300/300" alt="" />
    <img src="https://picsum.photos/id/227/300/300" className="alt" alt="" /></ScGlowingBorderAni>;
}
