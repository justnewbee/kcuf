import {
  ReactElement,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  LongArticle
} from '@kcuf/demo-rc';

const ScSunBeam = styled.div`
  --min-padding: 1rem;
  --background-gradient-start: calc(var(--scroll-top, 0) * .1deg);
  --header-bg-center: calc(var(--min-padding) + 3rem) calc(4rem - var(--scroll-top, 0) * 1px);
  --color-light1: hsl(35 100% 90%);
  --color-light2: hsl(35 100% 95%);
  
  position: relative;
  z-index: 1;
  padding: var(--min-padding);
  min-height: 400px;
  background: repeating-conic-gradient(from var(--background-gradient-start, 0deg) at var(--header-bg-center), var(--color-light1) 0 4deg, transparent 0 8deg) fixed;
  background-color: var(--color-light2);
`;

export default function StorySunBeam(): ReactElement {
  useEffect(() => {
    function scroll(): void { // 转动起来的关键
      document.documentElement.style.setProperty('--scroll-top', String(document.documentElement.scrollTop));
    }
    
    document.addEventListener('scroll', scroll);
    
    return () => document.removeEventListener('scroll', scroll);
  }, []);
  
  return <>
    <ScSunBeam>
      <h1>参考自 <a href="https://lea.verou.me" target="_blank" rel="noreferrer">https://lea.verou.me</a> 的顶部样式，滚动会旋转</h1>
    </ScSunBeam>
    <LongArticle />
  </>;
}
